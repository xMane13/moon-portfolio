import type { Metadata, Viewport } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manuel M. Muñoz-Cárdenas",
  description: "Manuel M. Muñoz-Cárdenas, computer science engineering student at Yachay Tech, Ecuador: computer vision, federated learning and full-stack software.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Read the stored language and mode before first paint, so nothing flashes.
const boot = `(function(){try{var d=document.documentElement;var l=localStorage.getItem('lang')||((navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en');d.dataset.lang=l;d.lang=l;var m=localStorage.getItem('mode');if(m)d.dataset.mode=m;d.classList.add('js');}catch(e){document.documentElement.classList.add('js');}})();`;

// The Hallmark stamp lives at the top of tokens.css; the CSS minifier drops comments,
// so the built page carries the same block inline for anyone auditing the output.
const tokens = readFileSync(join(process.cwd(), "app", "tokens.css"), "utf8");
const stamp = tokens.slice(0, tokens.indexOf(":root")).trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: stamp }} />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
