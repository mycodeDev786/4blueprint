"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthGuard from "./components/AuthGuard";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import BottomTab from "./components/BottomTab";
import { usePathname } from "next/navigation";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
import { hydrateAuth } from "../app/store/authSlice";
import { useEffect, useState, Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Component to handle Redux Hydration
const ReduxProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    dispatch(hydrateAuth()); // Restore session from localStorage
    setIsHydrated(true);
  }, [dispatch]);

  if (!isHydrated) return null; // Prevents mismatches between SSR and client

  return children;
};

// ✅ Component to handle Cart safely
const NavbarWithCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  return <Navbar cartCount={totalItems} />;
};

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const ShowSidebars = pathname === "/" || pathname === "/categories";

  return (
    <html className="m-0 p-0 " lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full pb-16 max-w-none overflow-x-hidden m-0 p-0`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <ReduxProvider>
              <AuthGuard>
                <NavbarWithCart />
                {!isMobile && ShowSidebars  && <Sidebar />}
                {children}
                {!isMobile && <Footer />}
                <BottomTab />
                {!isMobile && ShowSidebars && <RightSidebar />}
              </AuthGuard>
            </ReduxProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
