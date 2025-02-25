"use client";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
      {/* ✅ Copyright Section */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} 4Blueprints. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
