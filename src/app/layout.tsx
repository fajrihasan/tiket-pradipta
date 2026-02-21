import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pradipta 26",
  description: "Bright Steps, Radiant Future - PRADIPTA 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} font-[family-name:var(--font-poppins)] bg-[linear-gradient(180deg,#2b0948,#7c2ca4)] animate-gradient overflow-x-hidden min-h-screen text-white`}
      >
        <StarBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
