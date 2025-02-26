"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../store/cartSlice";
export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    // Dispatching the item details to the cart
    dispatch(
      addToCart({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        price: recipe.price,
        bakerId: recipe.bakerId,
        quantity: 1, // Default quantity set to 1
      })
    );
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Recipe Image */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        className="w-32 h-32 rounded-lg object-cover"
      />

      {/* Recipe Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-sm text-gray-600">
          Ingredients: {recipe.ingredients}
        </p>

        {/* Purchase Status (Same Line, "Buy Now" Right-Aligned) */}
        <div className=" mt-2 flex items-center">
          {!recipe.purchased && (
            <p className="text-white  bg-black h-8 px-2 py-1.5 font-semibold text-sm">
              RECIPE LOCKED
            </p>
          )}
          {recipe.purchased ? (
            <button className="bg-[#673AB7] text-white px-3 py-1 hover:bg-blue-700 rounded-lg ml-auto">
              See More
            </button>
          ) : (
            <div className="text-orange-600 font-semibold ml-auto">
              {/* Cart & Price */}
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full transition-transform transform hover:scale-105 transition-colors"
                title="Add to Cart"
              >
                <FaShoppingCart className="text-gray-700 text-lg" />
                <span className="font-medium text-sm text-gray-900">
                  (${recipe.price.toFixed(2)})
                </span>
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
