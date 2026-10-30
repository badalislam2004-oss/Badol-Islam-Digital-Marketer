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
  title: "Md Badal Islam | Conversion Tracking & Google Ads Specialist",
  description:
    "Md Badal Islam is a digital marketing expert specializing in conversion tracking (GTM, GA4, enhanced conversions) and Google Ads for businesses and agencies worldwide.",
  openGraph: {
    title: "Md Badal Islam | Digital Marketing Expert",
    description:
      "Md Badal Islam is a digital marketing expert specializing in conversion tracking (GTM, GA4, enhanced conversions) and Google Ads for businesses and agencies worldwide.",
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
