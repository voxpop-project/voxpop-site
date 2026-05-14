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
    default: "VoxPop — La voix du peuple, sans frontières",
    template: "%s | VoxPop",
  },
  description:
    "Pétitions citoyennes à preuve cryptographique. Anonyme · Vérifiable · Incensurable. Quand l'État refuse le référendum, les Français se prononcent quand même.",
  metadataBase: new URL("https://voxpop-app.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://voxpop-app.com",
    siteName: "VoxPop",
    title: "VoxPop — La voix du peuple, sans frontières",
    description:
      "Pétitions citoyennes à preuve cryptographique. Anonyme · Vérifiable · Incensurable. Code open source AGPL-3.0.",
    images: [
      {
        url: "/images/og-voxpop.png",
        width: 1200,
        height: 630,
        alt: "VoxPop — Pétitions cryptographiques anonymes et vérifiables",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoxPop — La voix du peuple, sans frontières",
    description:
      "Pétitions citoyennes à preuve cryptographique. Anonyme · Vérifiable · Incensurable.",
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
