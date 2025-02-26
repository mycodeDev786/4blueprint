"use client";

import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function Cookbook() {
  const wishlistState = useSelector((state) => state.wishlist);
  console.log("Wishlist State:", wishlistState); // Debugging

  const wishlist = wishlistState?.items ?? []; // Ensures wishlist is always an array

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in your wishlist.</p>
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
