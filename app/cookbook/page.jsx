"use client";

import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function Cookbook() {
  const wishlistState = useSelector((state) => state.wishlist);
  console.log("Wishlist State:", wishlistState); // Debugging

  const wishlist = wishlistState?.items ?? []; // Ensures wishlist is always an array

  return (
    <div className="max-w-4xl mx-auto p-6 px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in your CookBook.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
