"use client";
import { assets } from "@/assets/assets";
import AllRecipePageCard from "../components/AllRecipePageCard";
import { useState, useEffect } from "react";
import recipes from "../constants/recipes";
import dessertCategories from "../constants/dessertCategories";

export default function AllCategories() {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // ✅ Fetching sample recipe data
  useEffect(() => {}, []);

  return <div className="px-0 mt-5 sm:px-6 md:px-12 lg:px-16 xl:px-24"></div>;
}
