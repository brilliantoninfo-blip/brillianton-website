import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import BrillGuide from "@/components/BrillGuide";
import MobileActionBar from "@/components/MobileActionBar";
import StructuredData from "@/components/StructuredData";
import { site } from "@/lib/site";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0A30C4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Premium University Admission Mentorship Program | Brillianton Global Education",
    template: "%s | Brillianton Global Education",
  },
  description: site.description,
  keywords: [
    "admission to top universities abroad",
    "Oxford Cambridge admission guidance India",
    "Ivy League admission mentorship program",
    "premium university admission mentorship program",
    "QS top 100 university admission",
    "fully funded scholarships for Indian students",
    "Fulbright Chevening DAAD Erasmus Mundus guidance",
    "study abroad mentorship Kerala",
    "study abroad guidance Calicut Kozhikode",
    "international academic mentorship",
    "Mission QS100",
    "Future Fellows",
    "Brillianton",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Brillianton Global Education — Your ambition has no borders",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Brillianton Global Education — Your ambition has no borders",
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/" },
  category: "education",
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once the Search Console property is created
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <StructuredData />
        <Loader />
        <SmoothScroll />
        <Header />
        <main id="main" className="overflow-x-clip">
          {children}
        </main>
        <Footer />
        <BrillGuide />
        <MobileActionBar />
      </body>
    </html>
  );
}
