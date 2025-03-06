"use client";
import { useState, useEffect, useRef } from "react";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = ({ cartCount }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const artistName = searchParams.get("name");
  // const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Get page title from pathname
  const getPageTitle = () => {
    if (pathname === "/") return "Home";
    const segments = pathname.split("/").filter((segment) => segment);
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const ShowUserTitle = pathname === "/cookbook";
  const ShowArtistTitle = pathname === "/artistProfile";
  const ShowBackButton = pathname === "/";
  const ShowAddRecipe = pathname === "/addrecipe";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        !menuRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Handle scrolling behavior for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Hide navbar on scroll down
        } else {
          setIsVisible(true); // Show navbar on scroll up
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handlecart = () => {
    router.push("/cart");
  };

  return (
    <>
      <nav
        className={`bg-[#673AB7] fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 h-16 text-gray-700 border-b border-gray-300 transition-all duration-300
          `} // Hide on mobile when scrolling down
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {/* Logo with menu close handler */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
        >
          <Image
            className="cursor-pointer h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
            src={assets.logo}
            alt="Company Logo"
            width={160}
            height={48}
            priority
          />
        </Link>

        {/* Mobile Page Title */}
        <span className="md:hidden text-[#ecd4be] font-medium mx-2 truncate"></span>

        {/* Desktop Elements */}
        <div className="hidden md:flex items-center gap-6 text-[16px] font-medium text-white">
          <Link href="/categories" className="hover:text-orange-300 transition">
            Categories
          </Link>

          <Link
            href="/verifiedbakers"
            className="hover:text-orange-300 transition"
          >
            Verified Artists
          </Link>
          <Link
            href="/leaderboard"
            className="hover:text-orange-300 transition"
          >
            LeaderBoard
          </Link>
          <Link href="/faq" className="hover:text-orange-300 transition">
            FAQ
          </Link>
          <Link href="/support" className="hover:text-orange-300 transition">
            Support
          </Link>
        </div>

        {/* Desktop Search */}
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

        {/* Desktop Cart */}
        <div
          className="hidden md:block relative cursor-pointer"
          onClick={handlecart}
        >
          <FaShoppingCart className="text-2xl text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        </div>

        {/* Right Section (Mobile & Desktop) */}
        <div className="flex items-center gap-4">
          {/* Mobile Cart */}
          <div
            className="md:hidden relative cursor-pointer"
            onClick={handlecart}
          >
            <FaShoppingCart className="text-2xl text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>

          {/* Desktop Account */}
          <div className="relative hidden md:block">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col py-4 z-50"
          >
            <Link
              href="/categories"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>

            <Link
              href="/verifiedbakers"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Verified Artists
            </Link>
            <Link
              href="/"
              className="py-2 px-6 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Leaderboard
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
            <hr className="my-2 border-gray-300 " />
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

      {/* ✅ Floating Spacer Section */}
      <div
        className={`fixed  top-16 left-0 w-full z-40 bg-white md:bg-white flex justify-center items-center h-10 transition-transform duration-300 ease-in-out
          ${isScrolled ? "shadow-lg" : "shadow-md"} 
          ${!isVisible ? "-translate-y-full" : "translate-y-0"}
          md:static md:translate-y-0 md:h-24 md:pt-16`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {!ShowBackButton && (
          <div className="absolute left-4 md:hidden">
            <button
              onClick={() => {
                router.push("/categories");
              }}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>
        )}
        {!ShowUserTitle && !ShowArtistTitle && !ShowAddRecipe && (
          <span className="text-black font-semibold mx-2 md:mt-1 truncate">
            {getPageTitle().toUpperCase()}
          </span>
        )}
        {ShowUserTitle && (
          <span className="text-black font-semibold mx-2 md:mt-1 truncate">
            {user?.name.toUpperCase()} COOKBOOK
          </span>
        )}
        {ShowArtistTitle && (
          <span className="text-black font-semibold mx-2 md:mt-1 truncate">
            {artistName.toUpperCase()} PROFILE
          </span>
        )}
        {ShowAddRecipe && (
          <span className="text-black font-semibold mx-2 md:mt-1 truncate">
            ADD RECIPE
          </span>
        )}
      </div>

      <div
        className={`w-full pt-24 h-28  flex justify-center items-center md:hidden
        `}
      ></div>
    </>
  );
};

export default Navbar;
