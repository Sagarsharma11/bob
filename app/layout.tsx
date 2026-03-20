import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// export const metadata: Metadata = {
//   title: 'Blasters of Bharat - Cricket Blog',
//   description: 'Your ultimate cricket knowledge hub with expert tips, analysis, and insights',
//   keywords: ['cricket', 'IPL', 'sports', 'fantasy cricket', 'coaching'],
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://blastersofbharat.vercel.app"),

  title: {
    default: "Blasters of Bharat | Weekend Cricket Matches & Player Stats",
    template: "%s | Blasters of Bharat",
  },

  description:
    "Blasters of Bharat is a weekend cricket community sharing match highlights, player stats, scorecards, and cricket moments from local matches in India.",

  keywords: [
    "weekend cricket India",
    "local cricket matches Bangalore",
    "cricket match stats",
    "cricket scorecard app",
    "amateur cricket team India",
    "Blasters of Bharat",
  ],

  openGraph: {
    title: "Blasters of Bharat | Weekend Cricket Matches",
    description:
      "Explore match scorecards, player stats, and cricket highlights from weekend cricket games.",
    url: "https://blastersofbharat.vercel.app",
    siteName: "Blasters of Bharat",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blasters of Bharat Cricket",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blasters of Bharat",
    description: "Weekend cricket, stats & match highlights",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://blastersofbharat.vercel.app",
  },

  category: "sports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
