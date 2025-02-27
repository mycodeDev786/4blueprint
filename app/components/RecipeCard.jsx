"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../store/cartSlice";

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        price: recipe.price,
        bakerId: recipe.bakerId,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 border border-gray-200 relative">
      {/* Recipe Image with Click to Zoom Effect */}
      <div
        className="relative overflow-hidden rounded-lg cursor-pointer"
        onClick={() => setIsClicked(true)}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-32 h-32 rounded-lg object-cover transition-transform duration-300"
        />
        {!recipe.isPurchased && (
          <div className="absolute bottom-0 left-0 w-full bg-transparent text-black text-center text-xs md:text-sm font-semibold  rounded-b-lg">
            RECIPE LOCKED
          </div>
        )}
      </div>

      {isClicked && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsClicked(false)}
        >
          <div className="relative w-[50vw] h-[50vh] bg-white p-4 rounded-lg shadow-xl">
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      )}

      {/* Recipe Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <h4 className="text-sm font-semibold text-purple-700">
          {" "}
          {recipe.artistName}
        </h4>
        <p className="text-sm text-gray-600">
          Ingredients: {recipe.ingredients}
        </p>

        <div className="mt-2 flex items-center">
          {!recipe.isPurchased ? (
            <div className="text-orange-600 font-semibold">
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full transition-transform transform hover:scale-105"
                title="Add to Cart"
              >
                <FaShoppingCart className="text-gray-700 text-lg" />
                <span className="font-medium text-sm text-gray-900">
                  (${recipe.price.toFixed(2)})
                </span>
              </button>
            </div>
          ) : null}
          <div className="ml-auto">
            <button className="w-20 h-20 flex items-center justify-center font-bold border-2 border-[#673AB7] text-[#673AB7] hover:bg-gray-200  rounded-full transition-transform transform hover:scale-105">
              Read Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
