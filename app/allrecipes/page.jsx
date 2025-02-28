"use client";
import { assets } from "@/assets/assets";
import AllRecipePageCard from "../components/AllRecipePageCard";
import { useState, useEffect } from "react";
import recipes from "../constants/recipes";
export default function AllRecipes() {
  // ✅ Fetching sample recipe data
  useEffect(() => {}, []);

  return (
    <div className="  px-0 mt-5 sm:px-6 md:px-12 lg:px-16 xl:px-24 ">
      {/* ✅ Grid Layout */}
      <div className=" max-w-lg mx-0 md:mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <AllRecipePageCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            bakerId={recipe.bakerId}
            rating={recipe.rating}
            price={recipe.price}
          />
        ))}
      </div>
    </div>
  );
}
