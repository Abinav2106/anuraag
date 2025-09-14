import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuraag - Premium First Aid Kits | Healthcare, Education & Corporate Safety",
  description: "Since 2001, Anuraag delivers premium first aid solutions to 1000+ hospitals, educational institutions, and corporate clients. ISO certified, sterile QC, ready-to-use emergency kits.",
  keywords: "first aid kits, medical supplies, healthcare safety, emergency kits, corporate safety, educational safety, hospital supplies, Chennai, medical equipment",
  authors: [{ name: "Anuraag Medicals" }],
  creator: "Anuraag Medicals",
  publisher: "Anuraag Medicals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://anuraag.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://anuraag.com",
    siteName: "Anuraag Medicals",
    title: "Anuraag - Premium First Aid Kits | Healthcare, Education & Corporate Safety",
    description: "Since 2001, Anuraag delivers premium first aid solutions to 1000+ hospitals, educational institutions, and corporate clients.",
    images: [
      {
        url: "/assets/static/hero.png",
        width: 1200,
        height: 630,
        alt: "Anuraag Premium First Aid Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuraag - Premium First Aid Kits",
    description: "Premium first aid solutions for healthcare, education & corporate safety since 2001.",
    images: ["/assets/static/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-dvh flex flex-col`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
