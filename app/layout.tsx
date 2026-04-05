import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import ScrollProgress from "@/components/ScrollProgress";
import MiniPlayer from "@/components/MiniPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMAN | Sonic Architect",
  description: "Defining the sonic landscape of modern music. Ethiopian DJ/Producer AMAN merges traditional rhythms with electronic beats.",
  keywords: "AMAN, Amanuel Dawit, Ethiopian Producer, Electronic Music, Future Bass, DJ, Addis Ababa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "AMAN",
    "alternateName": "Amanuel Dawit",
    "description": "Ethiopian electronic music producer shaping the soundscape since 2015.",
    "genre": ["Electronic", "Future Bass", "House", "Ethiopian Trad-Fusion"],
    "sameAs": [
      "https://youtube.com/@thisisaman.official",
      "https://www.instagram.com/thisiz_aman",
      "https://www.tiktok.com/@thisis_aman"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.className} bg-[#0d2c2c] text-white antialiased selection:bg-[#5eead4] selection:text-black`}>
        <FilmGrain />
        <ScrollProgress />
        <MiniPlayer />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}