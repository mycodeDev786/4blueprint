"use client";

import Image from "next/image";

export default function RecipeCard({ recipe }) {
  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Recipe Image */}
      <Image
        src={recipe.image}
        alt={recipe.name}
        className="w-32 h-32 rounded-lg object-cover"
      />

      {/* Recipe Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{recipe.name}</h3>
        <p className="text-sm text-gray-600">
          Ingredients: {recipe.ingredients.join(", ")}
        </p>

        {/* Purchase Status (Same Line, "Buy Now" Right-Aligned) */}
        <div className="mt-2 flex items-center">
          {!recipe.purchased && (
            <p className="text-purple-700 font-semibold text-sm">
              The recipe has not been unlocked.
            </p>
          )}
          {recipe.purchased ? (
            <button className="bg-[#673AB7] text-white px-3 py-1 hover:bg-blue-700 rounded-lg ml-auto">
              See More
            </button>
          ) : (
            <button className="text-orange-600 font-semibold ml-auto">
              Buy Now (${recipe.price})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
