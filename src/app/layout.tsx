import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "VoxPop — La voix du peuple",
    template: "%s | VoxPop",
  },
  description:
    "La seule plateforme ou votre opinion compte vraiment. Vote anonyme, verifiable et impossible a censurer. Zero-Knowledge Proofs, open source, anti-censure.",
  metadataBase: new URL("https://voxpop-app.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://voxpop-app.com",
    siteName: "VoxPop",
    title: "VoxPop — La voix du peuple",
    description:
      "Vote securise, anonyme et verifiable grace aux Zero-Knowledge Proofs. Open source, anti-censure. Pour associations, entreprises et citoyens.",
    images: [
      {
        url: "/images/og-voxpop.png",
        width: 1200,
        height: 630,
        alt: "VoxPop — Vote securise et anonyme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxPop — La voix du peuple",
    description:
      "Vote securise, anonyme et verifiable. Zero-Knowledge Proofs, open source, anti-censure.",
    images: ["/images/og-voxpop.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://voxpop-app.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-vp-dark text-slate-100`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
