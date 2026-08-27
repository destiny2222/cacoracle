import type { Metadata } from "next";
import { Poppins, Patua_One, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const patuaOne = Patua_One({
  variable: "--font-patua-one",
  subsets: ["latin"],
  weight: ["400"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecacoracle.com"),
  title: "The CAC Oracle Global Consult | Brand Registration Agency",
  description: "We simplify business registration in Nigeria. Get professional support for CAC registration, Tax Promax, annual returns, SCUML, NIN modification, and passports.",
  keywords: [
    "CAC Registration",
    "Business Registration Nigeria",
    "SCUML Processing",
    "Annual Returns",
    "NIN Modification",
    "International Passport Nigeria",
    "The CAC Oracle",
    "Ejiaka Pascal Nnchdonna",
    "Company Registration LLC"
  ],
  openGraph: {
    title: "The CAC Oracle Global Consult | Brand Registration Agency",
    description: "We simplify business registration in Nigeria. Get professional support for CAC registration, Tax Promax, annual returns, SCUML, NIN modification, and passports.",
    url: "https://thecacoracle.com",
    siteName: "The CAC Oracle Global Consult",
    images: [
      {
        url: "/register.jpg",
        width: 1200,
        height: 630,
        alt: "The CAC Oracle Global Consult - Brand Registration Agency"
      }
    ],
    locale: "en_NG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "The CAC Oracle Global Consult | Brand Registration Agency",
    description: "We simplify business registration in Nigeria. Get professional support for CAC registration, Tax Promax, annual returns, SCUML, NIN modification, and passports.",
    images: ["/register.jpg"],
    creator: "@thecacoracle"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${patuaOne.variable} ${luckiestGuy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
