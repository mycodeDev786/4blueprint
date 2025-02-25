"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import RightSidebar from "./components/RightSidebar";
import BottomTab from "./components/BottomTab";
import { useEffect, useState } from "react";
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
  const [isArtist, setIsArtist] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideSidebars =
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/verifiedbakers" ||
    pathname === "/faq" ||
    pathname === "/support";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full mx-0 sm:mx-auto m-0 `}
      >
        <Navbar />
        {!isMobile && !hideSidebars && <Sidebar isArtist={isArtist} />}
        {children}
        {!isMobile && <Footer />}
        {isMobile && !hideSidebars && <BottomTab />}
        {/* {!isMobile && !hideSidebars && <RightSidebar />} */}
      </body>
    </html>
  );
}
