"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";
import RightSidebar from "./components/RightSidebar";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import BottomTab from "./components/BottomTab";
import { useEffect, useState } from "react";
import { Suspense } from "react";

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
    pathname === "/leaderboard" ||
    pathname === "/support";

  return (
    <html className="m-0 p-0 " lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full pb-16 max-w-none overflow-x-hidden m-0 p-0`}
      >
        {/* Wrap everything in Provider */}
        <Provider store={store}>
          <NavbarWithCart />
          {!isMobile && !hideSidebars && <Sidebar isArtist={isArtist} />}
          <Suspense> {children}</Suspense>
          {!isMobile && <Footer />}
          <BottomTab />
          {/* {!isMobile && !hideSidebars && <RightSidebar />} */}
        </Provider>
      </body>
    </html>
  );
}

///////////////////////////////
// Component to handle Cart
///////////////////////////////
const NavbarWithCart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return <Navbar cartCount={totalItems} />;
};
