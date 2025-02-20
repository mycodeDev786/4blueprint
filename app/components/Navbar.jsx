"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [user, setUser] = useState(null); // Example user state (replace with auth logic)
  const [dropdownOpen, setDropdownOpen] = useState(false); // Account dropdown state
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 bg-white text-gray-700 shadow-md relative">
      {/* ✅ Logo */}
      <Link href="/">
        <Image className="cursor-pointer w-28 md:w-16" src={assets.logo} alt="logo" width={100} height={40} />
      </Link>

      {/* ✅ Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-gray-900 transition font-medium">Home</Link>
        <Link href="/recipes" className="hover:text-gray-900 transition font-medium">All Recipes</Link>
        <Link href="/faq" className="hover:text-gray-900 transition font-medium">FAQ</Link>
        <Link href="/support" className="hover:text-gray-900 transition font-medium">Support</Link>
      </div>

      {/* ✅ Search Bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center border px-3 py-1 rounded-md bg-gray-100">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none bg-transparent w-40 md:w-60 text-sm"
        />
        <button type="submit">
          <Image className="w-5 h-5" src={assets.search_icon} alt="Search" width={20} height={20} />
        </button>
      </form>

      {/* ✅ Account & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        {/* Account Section */}
        <div className="relative">
          {user ? (
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer flex items-center gap-2">
              <Image src={user.profilePic} alt="User" width={36} height={36} className="rounded-full border" />
            </div>
          ) : (
            <button onClick={() => router.push("/signin")} className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Sign In
            </button>
          )}

          {/* Account Dropdown */}
          {dropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button onClick={() => setUser(null)} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            // Close (X) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Menu (☰) icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md flex flex-col py-4 z-50 md:hidden">
          <Link href="/" className="py-2 px-6 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/recipes" className="py-2 px-6 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>All Recipes</Link>
          <Link href="/faq" className="py-2 px-6 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="/support" className="py-2 px-6 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Support</Link>
          <hr className="my-2 border-gray-300" />
          {user ? (
            <>
              <Link href="/profile" className="py-2 px-6 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={() => { setUser(null); setMenuOpen(false); }} className="py-2 px-6 text-left hover:bg-gray-100 w-full">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => { router.push("/signin"); setMenuOpen(false); }} className="py-2 px-6 text-left hover:bg-gray-100 w-full">
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
