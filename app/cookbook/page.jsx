"use client";

import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function Cookbook() {
  const wishlistState = useSelector((state) => state.wishlist);
  console.log("Wishlist State:", wishlistState); // Debugging

  const wishlist = wishlistState?.items ?? []; // Ensures wishlist is always an array

  return (
    <div className="max-w-3xl mx-auto p-6 px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      {wishlist.length === 0 ? (
        <p className="text-gray-500 px-1">
          It looks like your cookbook is empty right now, but that’s totally
          okay! You can quickly fill it up with your favorite recipes. Just
          click "Add to Cookbook" below any recipe you love to get started!
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-4 p-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              All
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Purchased
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Unpurchased
            </button>
          </div>
          {wishlist.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
