import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceUrl = "https://tis.edu.in/";
const userAgent = "TIS-Homepage-Assessment-AssetInventory/1.0 (polite single-page audit)";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventoryPath = path.join(projectRoot, "scripts", "assets-inventory.json");
const inlineSvgDirectory = path.join(projectRoot, "public", "images", "extracted-svg");
const trackingPattern = /google-analytics|googletagmanager|doubleclick|facebook\.net\/.*fbevents|hotjar|clarity\.ms|segment\.io/i;

function attributes(tag) {
  const values = {};
  const expression = /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of tag.matchAll(expression)) {
    values[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return values;
}

function cleanText(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function guessSection(html, offset) {
  const preceding = html.slice(0, offset);
  const sectionStart = preceding.lastIndexOf("<section");
  const articleStart = preceding.lastIndexOf("<article");
  const blockStart = Math.max(sectionStart, articleStart);
  if (blockStart >= 0) {
    const openingTagEnd = preceding.indexOf(">", blockStart);
    const openingTag = preceding.slice(blockStart, openingTagEnd + 1);
    const sectionAttributes = attributes(openingTag);
    const identifier = sectionAttributes.id || sectionAttributes.class || sectionAttributes["aria-label"];
    if (identifier) return cleanText(identifier).slice(0, 100);
  }

  const headings = [...preceding.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
  return headings.length ? cleanText(headings.at(-1)[1]).slice(0, 100) : "Page chrome";
}

function largestSrcsetCandidate(srcset) {
  if (!srcset) return undefined;
  return srcset
    .split(",")
    .map((candidate) => candidate.trim().split(/\s+/))
    .filter(([url]) => url && !url.startsWith("data:"))
    .map(([url, descriptor = "0w"]) => ({
      url,
      size: Number.parseFloat(descriptor) * (descriptor.endsWith("x") ? 10000 : 1),
    }))
    .sort((left, right) => right.size - left.size)[0]?.url;
}

function addUrl(records, value, baseUrl, detail) {
  if (!value) return;
  try {
    const resolvedUrl = new URL(value, baseUrl);
    if (!["http:", "https:"].includes(resolvedUrl.protocol) || trackingPattern.test(resolvedUrl.href)) return;
    const key = resolvedUrl.href;
    const existing = records.get(key);
    if (existing) {
      if (!existing.alt && detail.alt) existing.alt = detail.alt;
      if (existing.section === "Page chrome" && detail.section !== "Page chrome") existing.section = detail.section;
      if (!existing.caption && detail.caption) existing.caption = detail.caption;
      return;
    }
    records.set(key, { sourceUrl: key, ...detail });
  } catch {
    return;
  }
}

function addSrcset(records, value, baseUrl, detail) {
  const selected = largestSrcsetCandidate(value);
  if (selected) addUrl(records, selected, baseUrl, detail);
}

function parseDimension(buffer, contentType) {
  const data = Buffer.from(buffer);
  if (contentType.includes("svg") || data.subarray(0, 200).toString("utf8").includes("<svg")) {
    const text = data.toString("utf8");
    const viewBox = text.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)["']/i);
    const width = text.match(/\bwidth=["']([\d.]+)/i);
    const height = text.match(/\bheight=["']([\d.]+)/i);
    return {
      width: Number(width?.[1] ?? viewBox?.[1]) || null,
      height: Number(height?.[1] ?? viewBox?.[2]) || null,
    };
  }
  if (data.length >= 24 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  if (data.length >= 10 && data.toString("ascii", 0, 3) === "GIF") {
    return { width: data.readUInt16LE(6), height: data.readUInt16LE(8) };
  }
  if (data.length >= 30 && data.toString("ascii", 0, 4) === "RIFF" && data.toString("ascii", 8, 12) === "WEBP") {
    const chunk = data.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + data.readUIntLE(24, 3), height: 1 + data.readUIntLE(27, 3) };
    }
    if (chunk === "VP8L" && data[20] === 0x2f) {
      return {
        width: 1 + (((data[22] & 0x3f) << 8) | data[21]),
        height: 1 + (((data[24] & 0x0f) << 10) | (data[23] << 2) | ((data[22] & 0xc0) >> 6)),
      };
    }
  }
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset < data.length) {
      if (data[offset] !== 0xff) break;
      const marker = data[offset + 1];
      const segmentLength = data.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
      }
      offset += segmentLength + 2;
    }
  }
  return { width: null, height: null };
}

async function mapLimit(values, limit, callback) {
  const results = new Array(values.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (nextIndex < values.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await callback(values[currentIndex]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": userAgent }, redirect: "follow" });
  return { response, text: await response.text() };
}

const pageResponse = await fetchText(sourceUrl);
const html = pageResponse.text;
const documentUrl = pageResponse.response.url;
const records = new Map();
const embeds = [];
const inlineSvgs = [];
const tagExpression = /<(?:img|source|video|iframe|link|meta)\b[^>]*>/gi;

for (const match of html.matchAll(tagExpression)) {
  const tag = match[0];
  const tagName = tag.match(/^<([\w-]+)/)?.[1]?.toLowerCase();
  const attrs = attributes(tag);
  const detail = {
    section: guessSection(html, match.index),
    type: "image",
    width: Number(attrs.width) || null,
    height: Number(attrs.height) || null,
    bytes: 0,
    alt: attrs.alt || attrs["aria-label"] || "",
    caption: "",
  };

  if (tagName === "img" || tagName === "source") {
    addUrl(records, attrs.src, documentUrl, detail);
    addUrl(records, attrs["data-src"], documentUrl, detail);
    addUrl(records, attrs["data-lazy-src"], documentUrl, detail);
    addSrcset(records, attrs.srcset || attrs["data-srcset"], documentUrl, detail);
    if (tagName === "source" && attrs.type?.startsWith("video/")) {
      addUrl(records, attrs.src, documentUrl, { ...detail, type: "video" });
    }
  }

  if (tagName === "video" || (tagName === "source" && attrs.type?.startsWith("video/"))) {
    addUrl(records, attrs.src, documentUrl, { ...detail, type: "video" });
    addUrl(records, attrs.poster, documentUrl, { ...detail, type: "image" });
  }
  if (tagName === "iframe" && attrs.src) {
    const embedUrl = new URL(attrs.src, documentUrl);
    const host = embedUrl.hostname.toLowerCase();
    const id = host.includes("youtube") ? embedUrl.pathname.split("/").filter(Boolean).at(-1) :
      host.includes("vimeo") ? embedUrl.pathname.split("/").filter(Boolean).at(-1) :
      host.includes("google") && host.includes("maps") ? embedUrl.searchParams.get("pb") || embedUrl.pathname : null;
    embeds.push({ url: embedUrl.href, host, id, section: detail.section, title: attrs.title || "" });
  }
  if (tagName === "link" && /stylesheet/i.test(attrs.rel || "")) {
    addUrl(records, attrs.href, documentUrl, { ...detail, type: "stylesheet" });
  }
  if (tagName === "link" && /icon|apple-touch-icon/i.test(attrs.rel || "")) {
    addUrl(records, attrs.href, documentUrl, { ...detail, type: "logo" });
  }
  if (tagName === "meta" && attrs.property === "og:image") {
    addUrl(records, attrs.content, documentUrl, { ...detail, type: "image", alt: "Open Graph image" });
  }
  if (attrs.style) {
    for (const urlMatch of attrs.style.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
      addUrl(records, urlMatch[1], documentUrl, detail);
    }
  }
}

for (const match of html.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)) {
  inlineSvgs.push(match[0]);
}
for (const match of html.matchAll(/style=["']([^"']+)["']/gi)) {
  for (const urlMatch of match[1].matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    addUrl(records, urlMatch[1], documentUrl, { section: guessSection(html, match.index), type: "image", width: null, height: null, bytes: 0, alt: "", caption: "" });
  }
}

const stylesheetRecords = [...records.values()].filter((record) => record.type === "stylesheet");
await mapLimit(stylesheetRecords, 4, async (stylesheet) => {
  try {
    const { response, text } = await fetchText(stylesheet.sourceUrl);
    if (!response.ok) return;
    for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
      addUrl(records, match[1], response.url, {
        section: stylesheet.section,
        type: /\.(?:woff2?|ttf|otf)(?:[?#]|$)/i.test(match[1]) ? "font" : "image",
        width: null,
        height: null,
        bytes: 0,
        alt: "",
        caption: "",
      });
    }
  } catch {
    return;
  }
});

const candidates = [...records.values()].filter((record) => record.type !== "stylesheet");
const inspected = await mapLimit(candidates, 4, async (record) => {
  try {
    const response = await fetch(record.sourceUrl, { headers: { "user-agent": userAgent }, redirect: "follow" });
    if (!response.ok) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "";
    const extension = new URL(record.sourceUrl).pathname.split(".").at(-1)?.toLowerCase();
    const isSvg = contentType.includes("svg") || extension === "svg";
    if (buffer.length < 1024 && !isSvg) return null;
    const dimensions = parseDimension(buffer, contentType);
    return {
      ...record,
      type: record.type === "logo" ? "logo" : record.type === "video" ? "video" : contentType.includes("font") ? "font" : isSvg ? "svg" : record.type,
      width: record.width || dimensions.width,
      height: record.height || dimensions.height,
      bytes: buffer.length,
    };
  } catch {
    return null;
  }
});

await mkdir(inlineSvgDirectory, { recursive: true });
for (const [index, svg] of inlineSvgs.entries()) {
  const name = `inline-${String(index + 1).padStart(3, "0")}.svg`;
  await writeFile(path.join(inlineSvgDirectory, name), svg, "utf8");
}

const inventory = {
  sourceUrl,
  finalUrl: documentUrl,
  status: pageResponse.response.status,
  fetchedAt: new Date().toISOString(),
  pageTitle: cleanText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ""),
  inlineSvgCount: inlineSvgs.length,
  embeds,
  assets: inspected.filter(Boolean).sort((left, right) => left.section.localeCompare(right.section) || left.sourceUrl.localeCompare(right.sourceUrl)),
};

await writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
const counts = new Map();
for (const asset of inventory.assets) counts.set(asset.type, (counts.get(asset.type) || 0) + 1);
const rows = [...counts.entries()].map(([type, count]) => `${type.padEnd(14)} ${String(count).padStart(4)}`);
process.stdout.write(`Source: ${sourceUrl}\nFinal URL: ${documentUrl}\nStatus: ${pageResponse.response.status}\nTitle: ${inventory.pageTitle || "(none)"}\nInline SVGs saved: ${inlineSvgs.length}\nInventory: scripts/assets-inventory.json\n\nType           Count\n${rows.join("\n")}\nAssets total   ${inventory.assets.length}\n`);