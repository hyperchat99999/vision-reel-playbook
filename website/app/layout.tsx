import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vision Reel Playbook — Direct the product",
  description: "An open-source studio for polished, deterministic product films built from real interfaces.",
  keywords: ["product video", "open source", "creative coding", "browser rendering", "FFmpeg"],
  openGraph: {
    title: "Vision Reel Playbook — Direct the product",
    description: "Turn a real interface into a polished, deterministic film where every claim is proved on screen.",
    type: "website",
    images: ["https://raw.githubusercontent.com/hyperchat99999/vision-reel-playbook/main/website/public/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Reel Playbook — Direct the product",
    description: "Open-source product films with deterministic motion and real UI proof.",
    images: ["https://raw.githubusercontent.com/hyperchat99999/vision-reel-playbook/main/website/public/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
