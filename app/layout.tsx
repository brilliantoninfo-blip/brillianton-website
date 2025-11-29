import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Brillianton - Global Mentoring for a Global Mindset",
  description: "International education & mentoring organization connecting students with global opportunities, mentorship, and exchange programs.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#0D47A1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0D47A1" />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

