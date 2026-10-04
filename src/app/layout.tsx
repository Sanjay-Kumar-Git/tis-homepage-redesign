import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Playfair_Display } from "next/font/google";
import { CustomCursor } from "@/components/animation/CustomCursor";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { Providers } from "@/components/layout/Providers";
import { site } from "@/data/site";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${barlow.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:min-h-11 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-ink-fg"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
