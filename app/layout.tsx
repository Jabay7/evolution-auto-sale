import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.businessName,
  keywords: [
    "Evolution Auto Sale",
    "car rental Oceanside CA",
    "specialty car rental Oceanside",
    "vehicle rental Oceanside",
    "North County San Diego car rental",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "automotive",
  referrer: "strict-origin-when-cross-origin",
};

/**
 * Static hosting cannot set response headers, so the policy ships as a meta
 * tag. `form-action 'none'` is the interesting one: this site collects no
 * customer data, and that rule makes it impossible for any injected markup to
 * submit anywhere.
 *
 * `frame-ancestors` is omitted because browsers ignore it in a meta tag and
 * log a console error for it; clickjacking protection would need a real
 * response header, which GitHub Pages cannot send.
 *
 * Deliberately NO `upgrade-insecure-requests`: every asset here is referenced
 * by a root-relative path and so already inherits the page's scheme. Adding it
 * rewrites those requests to https even when the page itself was served over
 * http, which blanks the page during the window before a TLS certificate is
 * issued.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'none'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "connect-src 'self'",
].join("; ");

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${archivo.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        {/*
          Runs before the body parses so scroll reveals never flash. Content is
          only hidden if this browser can reveal it again, and a watchdog
          un-hides everything if the Reveal components never hydrate — a blank
          page is far worse than a missing animation.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if("IntersectionObserver" in window){var e=document.documentElement;' +
              'e.dataset.js="1";setTimeout(function(){' +
              'if(e.dataset.revealReady!=="1")delete e.dataset.js},4000)}',
          }}
        />
        <a
          href="#fleet"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bg"
        >
          Skip to fleet
        </a>
        {children}
      </body>
    </html>
  );
}
