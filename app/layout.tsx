import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import ScrollProgress from "@/components/ScrollProgress";
import MiniPlayer from "@/components/MiniPlayer";

export const metadata: Metadata = {
  metadataBase: new URL("https://thisizaman.et"),
  title: "AMAN | Ethiopian Music Producer & DJ",
  description: "Amanuel Dawit (AMAN) is a pioneering Ethiopian electronic music producer and DJ. Bridging the gap between Ethiopia's rich musical heritage and contemporary electronic music.",
  keywords: [
    "AMAN", 
    "Amanuel Dawit", 
    "Ethiopian Producer", 
    "Ethiopian DJ", 
    "Electronic Music Ethiopia", 
    "Future Bass", 
    "Addis Ababa Music", 
    "Ethiopian Beat Maker", 
    "African Electronic Music", 
    "Commercial Jingle Producer"
  ],
  authors: [{ name: "AMAN (Amanuel Dawit)" }],
  creator: "AMAN",
  publisher: "AMAN Official",
  category: "Music",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AMAN | Ethiopian Music Producer",
    description: "Bridging the gap between Ethiopia's rich musical heritage and contemporary electronic music.",
    url: "https://thisizaman.et",
    siteName: "AMAN Official",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AMAN - Music Producer from Ethiopia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMAN | Ethiopian Music Producer",
    description: "Bridging the gap between Ethiopia's rich musical heritage and contemporary electronic music.",
    images: ["/og-image.png"],
    creator: "@thisisaman",
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["MusicGroup", "Person"],
    "name": "AMAN",
    "alternateName": "Amanuel Dawit",
    "jobTitle": "Music Producer & DJ",
    "nationality": "Ethiopian",
    "description": "Ethiopian electronic music producer and DJ shaping the soundscape of Addis Ababa since 2015. Specializing in Future Bass, Electronic Music, and commercial audio branding.",
    "url": "https://thisizaman.et",
    "genre": ["Electronic", "Future Bass", "House", "Ethiopian Trad-Fusion"],
    "sameAs": [
      "https://youtube.com/@thisisaman.official",
      "https://www.instagram.com/thisiz_aman",
      "https://www.tiktok.com/@thisis_aman"
    ],
    "knowsAbout": ["Music Production", "Film Scoring", "DJing", "Audio Engineering", "Commercial Jingles"]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="font-sans bg-[#0d2c2c] text-white antialiased selection:bg-[#5eead4] selection:text-black">
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