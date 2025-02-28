"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function Cookbook() {
  const wishlistState = useSelector((state) => state.wishlist);
  const wishlist = wishlistState?.items ?? []; // Ensures wishlist is always an array

  const [filter, setFilter] = useState("all");

  const filteredWishlist = wishlist.filter((recipe) => {
    if (filter === "purchased") return recipe.isPurchased;
    if (filter === "unpurchased") return !recipe.isPurchased;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-6 px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      {wishlist.length === 0 ? (
        <p className="text-gray-500 px-2 text-justify">
          It looks like your cookbook is empty right now, but that’s totally
          okay! ,<br /> You can quickly fill it up with your favorite recipes.
          Just click "Add to Cookbook" below any recipe you love to get started!
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-4 p-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("purchased")}
              className={`px-4 py-2 rounded-lg ${
                filter === "purchased"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              Purchased
            </button>
            <button
              onClick={() => setFilter("unpurchased")}
              className={`px-4 py-2 rounded-lg ${
                filter === "unpurchased"
                  ? "bg-red-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              Unpurchased
            </button>
          </div>
          {filteredWishlist.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
