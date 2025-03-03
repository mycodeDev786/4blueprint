"use client";
import { assets } from "@/assets/assets";
import AllRecipePageCard from "../components/AllRecipePageCard";
import { useState, useEffect, useRef } from "react";
import recipes from "../constants/recipes";
import dessertCategories from "../constants/dessertCategories";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllCategories() {
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const toggleDropdown = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center mt-5 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 ">
      <div
        className=" max-w-2xl w-full bg-gray-100 p-4 rounded-lg shadow-md flex space-x-6 mx-auto lg:ml-[250px] lg:mr-[250px]"
        ref={menuRef}
      >
        {dessertCategories.map((category) => (
          <div key={category.id} className="relative">
            {/* Category Button */}
            <button
              onClick={() => toggleDropdown(category.id)}
              className="flex flex-col items-center p-2"
            >
              <Image
                src={category.image}
                alt={category.name}
                className="w-32 h-20 rounded-md shadow-md" /* Changed to rectangular */
              />
              <span className="mt-2 text-sm font-semibold">
                {category.name}
              </span>
            </button>

            {/* Dropdown */}
            {openCategory === category.id && (
              <div className="absolute mb-10 top-16 left-1/2 transform z-50 -translate-x-1/2 bg-white shadow-lg rounded-md p-3 w-40">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-3 py-2 hover:bg-gray-200 rounded-md cursor-pointer"
                    onClick={() => {
                      const formattedCategory = sub.name
                        .replace(/\s+/g, "-")
                        .toLowerCase();
                      router.push(`/categories/${formattedCategory}`);
                    }}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
