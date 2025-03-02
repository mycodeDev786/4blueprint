"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Cookbook() {
  const wishlistState = useSelector((state) => state.wishlist);
  const wishlist = wishlistState?.items ?? []; // Ensures wishlist is always an array

  const [filter, setFilter] = useState("all");

  const totalAll = wishlist.length;
  const totalPurchased = wishlist.filter((recipe) => recipe.isPurchased).length;
  const totalUnpurchased = totalAll - totalPurchased;

  const filteredWishlist = wishlist.filter((recipe) => {
    if (filter === "purchased") return recipe.isPurchased;
    if (filter === "unpurchased") return !recipe.isPurchased;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-6 px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-justify px-4">
          It looks like your cookbook is empty right now, but that’s totally
          okay! <br />
          <br />
          You can quickly fill it up with your favorite recipes. Just click "Add
          to Cookbook" below any recipe you love to get started!
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-row justify-center bg-violet-500">
            <button className="px-4 py-2 rounded-lg flex items-center gap-2">
              <Image
                src={assets.archive_icon}
                alt="Custom Icon"
                className="w-5 h-5"
              />
              <span className="text-white font-semibold">Archive List</span>
            </button>
          </div>
          <div className="flex justify-center gap-4 p-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              All ({totalAll})
            </button>
            <button
              onClick={() => setFilter("purchased")}
              className={`px-4 py-2 rounded-lg ${
                filter === "purchased"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              Purchased ({totalPurchased})
            </button>
            <button
              onClick={() => setFilter("unpurchased")}
              className={`px-4 py-2 rounded-lg ${
                filter === "unpurchased"
                  ? "bg-red-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              Unpurchased ({totalUnpurchased})
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
