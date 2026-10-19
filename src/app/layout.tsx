import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Portfolio of Manan Shah: ML / Applied AI engineer, software, test & automation engineer, and forward deployed engineer. M.S. Computer Science, Indiana University.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.person.name} — ML & Software Engineer`,
    template: `%s — ${site.person.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.person.name,
    title: `${site.person.name} — ML & Software Engineer`,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

// Runs before first paint: applies the saved light/dark choice (no flash of the wrong theme),
// and arms scroll animations unless the visitor's OS asks for reduced motion. If the app's JS
// hasn't started within 4s, animations are disarmed so content can never stay hidden.
const headScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","on");setTimeout(function(){if(!window.__revealReady)d.removeAttribute("data-motion")},4000)}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
