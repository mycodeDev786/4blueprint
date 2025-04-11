"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import "./globals.css";
import Navbar from "./components/Navbar"; // Optional, use if you want to show it

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Optional mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ShowSidebars = pathname === "/" || pathname === "/categories";

  return (
    <html lang="en" className="m-0 p-0">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full pb-16 max-w-none overflow-x-hidden m-0 p-0`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {/* Optional: use Navbar if needed */}
          {/* {ShowSidebars && <Navbar />} */}
          {children}
        </Suspense>
      </body>
    </html>
  );
}
