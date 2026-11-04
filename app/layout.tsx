import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3faf6" },
    { media: "(prefers-color-scheme: dark)", color: "#04140e" },
  ],
};

export const metadata: Metadata = {
  title: "Md. Badal Islam | Digital Marketing & Conversion Tracking Specialist",
  description:
    "Md. Badal Islam is a Bangladesh-based digital marketing and conversion tracking specialist helping businesses with Google Ads, Meta Ads, GTM, GA4, and campaign measurement.",
  openGraph: {
    title: "Md. Badal Islam | Digital Marketing & Conversion Tracking Specialist",
    description:
      "Based in Bangladesh, Md. Badal Islam helps businesses improve Google Ads and Meta Ads campaigns with reliable conversion tracking, GTM, and GA4.",
    siteName: "Md Badal Islam",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
