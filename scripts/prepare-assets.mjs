import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventoryPath = path.join(root, "scripts", "assets-inventory.json");
const outputRoot = path.join(root, "public", "images");
const sourceUrl = "https://tis.edu.in/";
const sourceDirectory = process.env.TIS_ASSET_SOURCE_DIR || path.join(os.tmpdir(), `tis-assets-source-${Date.now()}`);
const convertedDirectory = path.join(os.tmpdir(), `tis-assets-webp-${Date.now()}`);
const userAgent = "TIS-Homepage-Assessment-AssetDownload/1.0 (polite source asset retrieval)";
const maxConcurrency = 4;

const sportsNames = new Map([
  ["archery", "archery"],
  ["cycling", "cycling"],
  ["hockey", "hockey"],
  ["swimming", "swimming"],
  ["taekwando", "taekwondo"],
  ["football", "football"],
  ["shooting", "shooting-range"],
  ["horseriding", "horse-riding"],
  ["billiards-single", "billiards"],
  ["squash", "squash"],
  ["volleyball", "volleyball"],
  ["basketball", "basketball"],
  ["cricket", "cricket"],
  ["lawntennis", "lawn-tennis"],
  ["badminton", "badminton"],
  ["tabletennis", "table-tennis"],
]);

const reviewNames = new Set(["tashi", "namita", "sandeep", "pinky", "suresh", "urja", "amit", "ashu", "gulabdas", "salendra"]);
const partnerNames = new Set(["cpi6", "inseec", "inseecu", "international-award-for-young-people-logo", "lions", "trinty", "universidad", "universitas", "universitat", "university", "universitylogo", "yhnbepcntet"]);

const browserDiscovered = [
  ...[1, 2, 3, 4].map((number) => ({
    sourceUrl: `https://tis.edu.in/_next/static/media/header-admissions${number}.${["05209ff0", "38fb234e", "1a11a772", "40f56300"][number - 1]}.JPG`,
    section: "Full-screen menu tile",
    type: "image",
    alt: [
      "Tulas International School campus life",
      "Tulas International School academic programs",
      "Tulas International School boarding facilities",
      "Tulas International School cultural events",
    ][number - 1],
  })),
  {
    sourceUrl: "https://tis.edu.in/_next/static/media/Button-Close-Menu.23983d77.png",
    section: "Full-screen menu control",
    type: "image",
    alt: "Close menu icon",
  },
  {
    sourceUrl: "https://tis.edu.in/_next/static/media/close.fe546060.svg",
    section: "Full-screen menu control",
    type: "svg",
    alt: "Close menu icon",
  },
  {
    sourceUrl: "https://assets.tulas.edu.in/Desktop_TIS.mp4",
    section: "Full-bleed future section",
    type: "video",
    alt: "",
  },
  {
    sourceUrl: "https://assets.tulas.edu.in/Mobile_TIS.mp4",
    section: "Full-bleed future section",
    type: "video",
    alt: "",
  },
];

function slug(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function fileInfo(url) {
  const pathname = new URL(url).pathname;
  const filename = decodeURIComponent(pathname.split("/").at(-1) || "asset");
  const parts = filename.split(".");
  const extension = parts.pop()?.toLowerCase() || "bin";
  const hashed = /^[a-f0-9]{8}$/i.test(parts.at(-1) || "");
  const stem = (hashed ? parts.slice(0, -1) : parts).join(".");
  return { filename, extension, stem: stem || filename };
}

function outputFor(asset) {
  const { extension, stem } = fileInfo(asset.sourceUrl);
  const normalizedStem = slug(stem);
  const rawName = stem.toLowerCase();
  if (asset.sourceUrl.includes("swimming.6fc81e65")) return { path: "hero-painting.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  const sport = sportsNames.get(rawName);
  if (sport) return { path: `sports/${sport}.webp`, section: "Sports", alt: `${sport.replaceAll("-", " ")} at Tulas International School`, maxWidth: 800 };

  if (rawName === "schooltopview") return { path: "campus.webp", section: "Full-bleed future section", alt: "Tulas International School campus", maxWidth: 1600 };
  if (rawName === "schoollogo") return { path: "logo.webp", section: "Brand identity", alt: "Tulas International School logo", maxWidth: 800 };
  if (rawName === "image 1") return { path: "hero-shooting.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "image 2") return { path: "hero-basketball.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "image 3") return { path: "hero-science.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "dance") return { path: "hero-dance.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "polo") return { path: "hero-cricket.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "karate") return { path: "hero-taekwondo.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "pot") return { path: "hero-pottery.webp", section: "Hero collage", alt: "", maxWidth: 800 };
  if (rawName === "swimming") return { path: "hero-painting.webp", section: "Hero collage", alt: "", maxWidth: 800 };

  if (rawName.startsWith("header-admissions")) {
    const number = rawName.match(/\d+/)?.[0] || "1";
    return { path: `menu/admissions-${number}.webp`, section: asset.section, alt: asset.alt, maxWidth: 800 };
  }
  if (rawName === "button-open-menu") return { path: "logos/menu-open.webp", section: "Full-screen menu control", alt: "Open menu icon", maxWidth: 800 };
  if (rawName === "button-close-menu") return { path: "logos/menu-close.webp", section: "Full-screen menu control", alt: "Close menu icon", maxWidth: 800 };

  if (reviewNames.has(rawName)) return { path: `reviews/${normalizedStem}.webp`, section: "Google Reviews", alt: `Photo of ${normalizedStem.replaceAll("-", " ")}`, maxWidth: 800 };
  if (partnerNames.has(rawName)) return { path: `logos/partners/${normalizedStem}.webp`, section: "12+ Collaborations", alt: `${normalizedStem.replaceAll("-", " ")} partner logo`, maxWidth: 800 };
  if (["topboarding", "bestresidential", "uttarakhand"].includes(rawName)) return { path: `awards/${normalizedStem}.webp`, section: "Awards", alt: `${normalizedStem.replaceAll("-", " ")} school award`, maxWidth: 800 };

  if (rawName === "footer-logo") return { path: "logos/footer-logo.webp", section: "Footer", alt: "Tulas International School logo", maxWidth: 800 };
  if (rawName === "school") return { path: "logos/brand-wordmark.webp", section: "Navbar", alt: "Tulas International School logo", maxWidth: 800 };
  if (rawName === "favicon") return { path: "logos/favicon.webp", section: "Brand identity", alt: "Tulas International School favicon", maxWidth: 800 };

  const peopleName = normalizedStem;
  if (/^(?:sakshimalik|prakashitomar|visheshbhriguvanshi|abhishekverma|aditigopichandswami|jeevanjyotsinghteja|ojaspravin|rajatchauhan|devendrasinghbisht|manishmetani|saurabhjoshi|arushinishank|lakshmiagarwal|dhansinghrawat|trivendrasinghrawat|subodhuniyal|rameshpokhriyalnishank|bhagatsinghkoshyari|dharmendrapradhan|anuragtripathi|arvindpandey|namamibansal|abhinavkumar|janmejayakhanduri|ashokkumar|amitkumarsinha|suniluniyalgama|sahdevsinghpundir)$/.test(rawName)) {
    return { path: `people/${peopleName}.webp`, section: "People and leaders", alt: `${peopleName.replaceAll("-", " ")} portrait`, maxWidth: 800 };
  }

  if (["attIS", "campus", "medical", "sports", "ratio", "ranking"].map((value) => value.toLowerCase()).includes(rawName)) {
    return { path: `stats/${normalizedStem}.webp`, section: "Stats", alt: "", maxWidth: 800 };
  }
  if (rawName === "imag e1" || rawName === "image1") return { path: "activities/music-practice.webp", section: "Student life", alt: "Tulas students practicing guitar", maxWidth: 800 };
  if (rawName === "image2") return { path: "activities/running-practice.webp", section: "Student life", alt: "Tulas students running on campus", maxWidth: 800 };
  if (rawName === "image3") return { path: "activities/health-room.webp", section: "Student life", alt: "Tulas student receiving care at the school health room", maxWidth: 800 };
  if (rawName.includes("googlereviewsbackground")) return { path: `reviews/${normalizedStem}.webp`, section: "Google Reviews", alt: "", maxWidth: 1200 };
  if (rawName === "mission") return { path: "activities/school-mission.webp", section: "About TIS", alt: "Tulas students on campus", maxWidth: 1600 };
  if (rawName === "atTIS".toLowerCase()) return { path: "stats/at-tulas.webp", section: "Stats", alt: "Tulas student studying", maxWidth: 800 };
  if (rawName === "360") return { path: "virtual-tour/360-icon.webp", section: "Virtual Tour", alt: "360 degree virtual tour icon", maxWidth: 800 };
  if (rawName === "see-more-text") return { path: "awards/see-more.webp", section: "Awards", alt: "See more awards", maxWidth: 800 };
  if (rawName === "see-all-activities") return { path: `activities/${normalizedStem}.webp`, section: "Sports", alt: "View all activities icon", maxWidth: 800 };
  if (rawName === "google-reviews-background-right") return { path: `reviews/${normalizedStem}.webp`, section: "Google Reviews", alt: "", maxWidth: 1200 };
  if (rawName === "international-award-for-young-people-logo") return { path: `logos/partners/${normalizedStem}.webp`, section: "12+ Collaborations", alt: "International Award for Young People logo", maxWidth: 800 };
  if (extension === "ico") return { path: `logos/${normalizedStem}.webp`, section: "Brand identity", alt: "Tulas International School favicon", maxWidth: 800 };
  if (extension === "svg") return { path: `icons/${normalizedStem}.svg`, section: asset.section, alt: asset.alt || "", maxWidth: 0 };

  return { path: `activities/${normalizedStem}.webp`, section: asset.section || "School activities", alt: asset.alt || "Tulas International School activity", maxWidth: 800 };
}

async function mapLimit(values, limit, callback) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      await callback(values[index], index);
    }
  });
  await Promise.all(workers);
}

async function getDimensions(buffer, contentType) {
  const data = Buffer.from(buffer);
  if (contentType.includes("svg")) {
    const text = data.toString("utf8");
    const viewBox = text.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)["']/i);
    const width = text.match(/\bwidth=["']([\d.]+)/i);
    const height = text.match(/\bheight=["']([\d.]+)/i);
    return { width: Number(width?.[1] ?? viewBox?.[1]) || null, height: Number(height?.[1] ?? viewBox?.[2]) || null };
  }
  return { width: null, height: null };
}

function runSharp(argumentsList) {
  const command = `npx --yes sharp-cli ${argumentsList.map((argument) => {
    const value = String(argument);
    return /\s/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
  }).join(" ")}`;
  return execFileSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", command], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
  });
}

await mkdir(sourceDirectory, { recursive: true });
await mkdir(convertedDirectory, { recursive: true });

const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
const allAssets = [...inventory.assets];
for (const asset of browserDiscovered) {
  if (!allAssets.some((record) => record.sourceUrl === asset.sourceUrl)) {
    allAssets.push({ ...asset, width: null, height: null, bytes: 0, caption: "" });
  }
}

const mediaAssets = allAssets.filter((asset) => ["image", "logo", "svg"].includes(asset.type));
const prepared = [];
const skipped = [];

await mapLimit(mediaAssets, maxConcurrency, async (asset, index) => {
  try {
    const response = await fetch(asset.sourceUrl, { headers: { "user-agent": userAgent }, redirect: "follow" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const { extension } = fileInfo(asset.sourceUrl);
    const isSvg = extension === "svg" || response.headers.get("content-type")?.includes("svg");
    if (bytes.length < 1024 && !isSvg) {
      skipped.push({ sourceUrl: asset.sourceUrl, reason: "Below 1 KB" });
      return;
    }
    const output = outputFor(asset);
    const id = String(index).padStart(4, "0");
    const sourcePath = path.join(sourceDirectory, `${id}.${extension === "ico" ? "ico" : extension}`);
    const cached = await stat(sourcePath).catch(() => null);
    if (cached) {
      prepared.push({ asset, output, id, sourcePath, bytes: cached.size, isSvg });
      return;
    }
    await writeFile(sourcePath, bytes);
    prepared.push({ asset, output, id, sourcePath, bytes: bytes.length, isSvg });
  } catch (error) {
    skipped.push({ sourceUrl: asset.sourceUrl, reason: error instanceof Error ? error.message : "Download failed" });
  }
});

const rasterGroups = new Map();
for (const entry of prepared.filter((item) => !item.isSvg)) {
  const group = entry.output.maxWidth <= 800 ? 800 : 1600;
  if (!rasterGroups.has(group)) rasterGroups.set(group, []);
  rasterGroups.get(group).push(entry);
}

const finalAssets = [];
for (const [maxWidth, entries] of rasterGroups) {
  const outputDirectory = path.join(convertedDirectory, String(maxWidth));
  await mkdir(outputDirectory, { recursive: true });
  for (let offset = 0; offset < entries.length; offset += 10) {
    const batch = entries.slice(offset, offset + 10);
    const inputArguments = ["-i", ...batch.map((entry) => entry.sourcePath)];
    const commonArguments = [...inputArguments, "-o", outputDirectory, "-f", "webp", "-q", "80", "resize", String(maxWidth)];
    const printed = runSharp(["--dry", "--print", ...commonArguments]);
    const metadata = JSON.parse(printed);
    const outputRecords = Array.isArray(metadata) ? metadata : [metadata];
    runSharp(commonArguments);
    for (const entry of batch) {
      const outputRecord = outputRecords.find((record) => path.basename(record.input.path) === path.basename(entry.sourcePath));
      if (!outputRecord) {
        skipped.push({ sourceUrl: entry.asset.sourceUrl, reason: "sharp-cli output metadata missing" });
        continue;
      }
      const outputFile = path.join(outputDirectory, `${entry.id}.webp`);
      const destination = path.join(outputRoot, entry.output.path);
      await mkdir(path.dirname(destination), { recursive: true });
      await rename(outputFile, destination);
      finalAssets.push({
        sourceUrl: entry.asset.sourceUrl,
        src: `/images/${entry.output.path.replaceAll("\\", "/")}`,
        width: outputRecord.output.width,
        height: outputRecord.output.height,
        alt: entry.output.alt,
        section: entry.output.section,
        bytes: outputRecord.output.size,
      });
    }
  }
}

for (const entry of prepared.filter((item) => item.isSvg)) {
  const destination = path.join(outputRoot, entry.output.path);
  await mkdir(path.dirname(destination), { recursive: true });
  await rename(entry.sourcePath, destination);
  const svgData = await readFile(destination);
  const dimensions = await getDimensions(svgData, "image/svg+xml");
  finalAssets.push({
    sourceUrl: entry.asset.sourceUrl,
    src: `/images/${entry.output.path.replaceAll("\\", "/")}`,
    width: dimensions.width,
    height: dimensions.height,
    alt: entry.output.alt,
    section: entry.output.section,
    bytes: svgData.length,
  });
}

const inlineDirectory = path.join(outputRoot, "extracted-svg");
const inlineFiles = await readdir(inlineDirectory).catch(() => []);
for (const [index, filename] of inlineFiles.entries()) {
  if (!filename.toLowerCase().endsWith(".svg")) continue;
  const source = path.join(inlineDirectory, filename);
  const destination = path.join(outputRoot, "illustrations", `original-mark-${String(index + 1).padStart(2, "0")}.svg`);
  await mkdir(path.dirname(destination), { recursive: true });
  await rename(source, destination);
  const svgData = await readFile(destination);
  const dimensions = await getDimensions(svgData, "image/svg+xml");
  finalAssets.push({
    sourceUrl: sourceUrl,
    src: `/images/illustrations/${path.basename(destination)}`,
    width: dimensions.width,
    height: dimensions.height,
    alt: "",
    section: "Original inline decorative mark",
    bytes: svgData.length,
  });
}
await rm(inlineDirectory, { recursive: true, force: true });

for (const asset of browserDiscovered.filter((item) => item.type === "video")) {
  try {
    const response = await fetch(asset.sourceUrl, { method: "HEAD", headers: { "user-agent": userAgent }, redirect: "follow" });
    const bytes = Number(response.headers.get("content-length")) || 0;
    if (!allAssets.some((record) => record.sourceUrl === asset.sourceUrl)) {
      allAssets.push({ ...asset, width: null, height: null, bytes, caption: "" });
    }
  } catch {
    skipped.push({ sourceUrl: asset.sourceUrl, reason: "Video size unavailable; retained remotely" });
  }
}

inventory.assets = allAssets;
await writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");
inventory.assets = allAssets.map((asset) => {
  const saved = finalAssets.find((entry) => entry.sourceUrl === asset.sourceUrl);
  return saved ? { ...asset, src: saved.src, width: saved.width, height: saved.height, bytes: saved.bytes, alt: saved.alt || asset.alt || "" } : asset;
});
await writeFile(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`, "utf8");

const typescriptAssets = finalAssets.map(({ src, width, height, alt, section, sourceUrl: origin }) => ({ src, width, height, alt, section, sourceUrl: origin }));
const assetsSource = `export interface LocalAsset {\n  src: string;\n  width: number | null;\n  height: number | null;\n  alt: string;\n  section: string;\n  sourceUrl: string;\n}\n\nexport const localAssets: LocalAsset[] = ${JSON.stringify(typescriptAssets, null, 2)};\n`;
await writeFile(path.join(root, "src", "data", "assets.ts"), assetsSource, "utf8");

const assetRows = finalAssets
  .map((asset) => `| \`${asset.src}\` | [source](${asset.sourceUrl}) | ${asset.section} | ${asset.width ?? "SVG"} × ${asset.height ?? "SVG"} | ${asset.alt || "Decorative"} |`)
  .join("\n");
const videoRows = inventory.assets.filter((asset) => asset.type === "video").map((asset) => `| ${asset.section} | [remote video](${asset.sourceUrl}) | ${asset.bytes || "Unknown"} bytes | Not downloaded: ffmpeg is unavailable |`).join("\n");
const docs = `# Tulas International School Asset Inventory\n\nThe listed brand and school imagery is sourced from the Tulas International School website and belongs to Tulas International School. These assets are used solely for this frontend assessment. Raster image derivatives are optimized WebP files; source vector art remains SVG.\n\n## Local Assets\n\n| Local path | Source URL | Section | Dimensions | Alt text |\n| --- | --- | --- | ---: | --- |\n${assetRows}\n\n## Remote Videos\n\nNo video originals are committed because ffmpeg is not installed in the environment and each source exceeds the 8 MB limit. The original URLs remain available to the player data.\n\n| Section | Source URL | Source bytes | Status |\n| --- | --- | ---: | --- |\n${videoRows}\n\n## Skipped\n\n${skipped.length ? skipped.map((item) => `- ${item.sourceUrl}: ${item.reason}`).join("\n") : "- No qualifying image or vector asset was skipped."}\n`;
await mkdir(path.join(root, "docs"), { recursive: true });
await writeFile(path.join(root, "docs", "ASSETS.md"), docs, "utf8");

const totalBytes = finalAssets.reduce((sum, asset) => sum + asset.bytes, 0);
process.stdout.write(`Raster/SVG source candidates: ${mediaAssets.length + inlineFiles.length}\nLocal files saved: ${finalAssets.length}\nSkipped: ${skipped.length}\nLocal asset bytes: ${totalBytes}\nVideos kept remote: ${inventory.assets.filter((asset) => asset.type === "video").length}\n`);
await rm(sourceDirectory, { recursive: true, force: true });
await rm(convertedDirectory, { recursive: true, force: true });