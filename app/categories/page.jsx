"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setActiveTab } from "../store/categoriesSlice"; // Import Redux actions
import Image from "next/image";
import { useRouter } from "next/navigation";
import dessertCategories from "../constants/dessertCategories"; // Import category data

export default function AllCategories() {
  const menuRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // Get Redux states
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const subcategories = useSelector((state) => state.category.subcategories);
  const activeTab = useSelector((state) => state.category.activeTab);

  // Toggle category dropdown
  const toggleDropdown = (category) => {
    if (selectedCategory === category.name) {
      dispatch(setCategory({ name: "", subcategories: [] })); // Close dropdown
    } else {
      dispatch(
        setCategory({
          name: category.name,
          subcategories: [
            { name: "All " + category.name, id: "all" },
            ...category.subcategories,
          ],
        })
      ); // Open dropdown
    }
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (category, sub) => {
    dispatch(setActiveTab(sub.name)); // Update active subcategory in Redux

    // Format URLs
    const formattedCategory = category.name.replace(/\s+/g, "-").toLowerCase();
    const formattedSubcategory = sub.name.replace(/\s+/g, "-").toLowerCase();

    // Navigate to category page

    router.push(`/categories/${formattedCategory}/${formattedSubcategory}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(setCategory({ name: "", subcategories: [] }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center mt-5 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 ">
      <div
        className="max-w-2xl w-full bg-gray-100 p-4 rounded-lg shadow-md flex space-x-6 mx-auto lg:ml-[250px] lg:mr-[250px]"
        ref={menuRef}
      >
        {dessertCategories.map((category) => (
          <div key={category.id} className="relative">
            {/* Category Button */}
            <button
              onClick={() => toggleDropdown(category)}
              className={`flex flex-col items-center p-2 ${
                selectedCategory === category.name
                  ? "bg-gray-300 rounded-md"
                  : ""
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                className="w-32 h-20 rounded-md shadow-md"
              />
              <span className="mt-2 text-sm font-semibold">
                {category.name}
              </span>
            </button>

            {/* Dropdown */}
            {selectedCategory === category.name && (
              <div className="absolute mb-10 top-16 left-36 transform z-50 -translate-x-1/2 bg-white shadow-lg rounded-md p-3 w-80">
                {subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className={`px-3 py-2 hover:bg-gray-200 rounded-md border-b-2 cursor-pointer ${
                      activeTab === sub.name ? "bg-blue-300" : ""
                    }`}
                    onClick={() => handleSubcategoryClick(category, sub)}
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
