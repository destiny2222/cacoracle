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
  title: "Your Brand Registration Agency | The CAC Oracle Global Consult",
  description: "We simplify everything and anything brand registration by answering all your questions and making the registration process smoother, easier and convenient.",
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
