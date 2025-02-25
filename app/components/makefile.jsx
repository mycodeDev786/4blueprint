"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const handlecart = () => {};
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={` bg-[#673AB7] fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 h-16  text-gray-700 border-b border-gray-300 transition-all ${
          isScrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        {/* ✅ Logo */}
        <Link href="/">
          <Image
            className="cursor-pointer h-12 w-auto object-contain transition-all duration-300 
            hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2"
            src={assets.logo}
            alt="Company Logo"
            width={160} // Increased for better clarity
            height={48} // Maintain 3.33:1 aspect ratio (same as 160x48)
            priority // Optional: if it's above-the-fold content
          />
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-[16px] font-medium text-white">
          <Link href="/recipes" className="hover:text-orange-300 transition">
            All Recipes
          </Link>
          <Link
            href="/verifiedbakers"
            className="hover:text-orange-300 transition"
          >
            Verified Bakers
          </Link>
          <Link href="/faq" className="hover:text-orange-300 transition">
            FAQ
          </Link>
          <Link href="/support" className="hover:text-orange-300 transition">
            Support
          </Link>
        </div>

        {/* ✅ Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim())
              router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
          }}
          className="hidden md:flex items-center border px-3 py-2 rounded-lg bg-gray-100"
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none bg-transparent w-44 md:w-60 text-sm"
          />
          <button type="submit">
            <Image
              className="w-5 h-5"
              src={assets.search_icon}
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        </form>
        {/* Cart Icon */}
        <div onClick={handlecart} className="relative cursor-pointer">
          <FaShoppingCart className="text-2xl text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            1
          </span>
        </div>
        {/* ✅ Account & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {user ? (
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer flex items-center gap-2"
              >
                <Image
                  src={user.profilePic}
                  alt="User"
                  width={36}
                  height={36}
                  className="rounded-full border"
                />
              </div>
            ) : (
              <button
                onClick={() => router.push("/signin")}
                className="hidden md:block  text-white px-4 py-2 rounded-lg transition"
              >
                Sign In
              </button>
            )}

            {/* Account Dropdown */}
            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setUser(null)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col py-4 z-50 md:hidden">
            <Link
              href="/"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              All Recipes
            </Link>
            <Link
              href="/verifiedbakers"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Verified Bakers
            </Link>
            <Link
              href="/faq"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/support"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Support
            </Link>
            <hr className="my-2 border-gray-300" />
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="py-2 px-6 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setUser(null);
                    setMenuOpen(false);
                  }}
                  className="py-2 px-6 text-left hover:bg-gray-100 w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/signin");
                  setMenuOpen(false);
                }}
                className="py-2 px-6 text-left hover:bg-gray-100 w-full"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Push content down so it doesn't get hidden behind navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
