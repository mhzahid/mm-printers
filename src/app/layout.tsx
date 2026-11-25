import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider, motionBootScript } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollChrome } from "@/components/motion/ScrollChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/site";

// Self-hosted variable fonts (no runtime dependency on Google Fonts).
// Archivo: weight 100–900, width 62–125. Instrument Sans: weight 400–700.
const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const instrument = localFont({
  src: "../fonts/InstrumentSans-Variable.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MM Printers — Garment accessories & packaging, Dhaka",
    template: "%s | MM Printers",
  },
  description:
    "Factory-direct garment accessories and packaging from Dhaka, Bangladesh: labels, hang tags, patches, buttons, elastics, drawcords and poly bags, coordinated from design to delivery.",
  applicationName: "MM Printers",
  openGraph: {
    type: "website",
    siteName: "MM Printers",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F6F4EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <ScrollChrome />
        <MotionProvider />
        <SmoothScroll />
        <PageTransition />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
