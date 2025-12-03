import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://brilliantonedu.com'),
  title: {
    default: 'Brillianton Global Education | International Mentoring & Student Exchange',
    template: '%s | Brillianton Global Education',
  },
  description: 'Connect with global mentors and explore international education opportunities. Brillianton offers student exchange programs, webinars, and personalized mentoring across 25+ countries.',
  keywords: [
    'global education',
    'international mentoring',
    'student exchange programs',
    'study abroad',
    'education mentorship',
    'international collaboration',
    'educational webinars',
    'global mentors',
    'student opportunities',
    'cross-cultural education',
  ],
  authors: [{ name: 'Brillianton Global Education' }],
  creator: 'Brillianton Global Education',
  publisher: 'Brillianton Global Education',
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#0D47A1",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brilliantonedu.com',
    siteName: 'Brillianton Global Education',
    title: 'Brillianton Global Education | International Mentoring & Student Exchange',
    description: 'Connect with global mentors and explore international education opportunities across 25+ countries.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brillianton Global Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brillianton Global Education | International Mentoring & Student Exchange',
    description: 'Connect with global mentors and explore international education opportunities across 25+ countries.',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code', // Add after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

