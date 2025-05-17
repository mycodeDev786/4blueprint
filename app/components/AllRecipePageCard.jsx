"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import { assets } from "@/assets/assets";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import API_ENDPOINTS from "../utils/api";

export default function AllRecipePageCard({
  id,
  title,
  description,
  ingredients,
  image,
  bakerId,
  price,
  rating,
  isPurchased,
  bakerCountry,
  bakerFlag,
  bakerName,
}) {
  const baker = bakers.find((b) => b.id === bakerId);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === id);
  const [showPrompt, setShowPrompt] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleWishlist = () => {
    setShowPrompt(true);

    setTimeout(() => {
      setShowPrompt(false);
    }, 2500);
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(
        addToWishlist({
          id,
          title,
          description,
          ingredients,
          image,
          price,
          bakerId,
          isPurchased,
          artistName: bakerName,
          // Default quantity
        })
      );
    }
  };

  return (
    <div className="max-w-sm cursor-pointer w-full bg-white shadow-lg rounded-2xl overflow-hidden sm:mx-auto mx-0 relative">
      <div className="w-full h-48 sm:h-56 relative">
        {/* Image */}
        <Image
          src={`${API_ENDPOINTS.STORAGE_URL}${image}`}
          alt={title}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />

        {/* Top right wishlist icon */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 text-xs   sm:text-sm rounded-md shadow-md"
        >
          {isWishlisted ? (
            // Solid book icon
            <Image
              src={assets.tran_addcookbook}
              alt="Custom Icon"
              className="w-6 h-6 bg-transparent"
            /> // Outlined book icon
          ) : (
            <Image
              src={assets.tran_removecookbook}
              alt="Custom Icon"
              className="w-6 h-6 bg-transparent "
            /> // Outlined book icon
          )}
        </button>

        {/* Bottom left rating */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded-md flex items-center text-[#9c51ac] gap-1 font-bold">
          <span className="text-[10px] sm:text-xs">★</span>
          <span className="text-gray-600 text-[8px] sm:text-xs">
            {rating}/5.0
          </span>
        </div>

        {/* Bottom right country flag and name */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded-md flex items-center gap-1 font-bold">
          {bakerFlag && (
            <Image
              src={bakerFlag}
              alt={bakerCountry}
              width={16}
              height={12}
              className="rounded-sm flex-shrink-0"
            />
          )}
          <span className="text-[10px] sm:text-xs truncate">
            {bakerCountry}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4 text-center">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-purple-700 font-bold text-xs sm:text-sm">
          By: {bakerName}
        </p>
        <div className="flex items-center justify-center mt-2">
          <span className="text-base sm:text-lg font-bold text-green-600">
            ${price}
          </span>
        </div>
      </div>
      {/* Prompt Message */}
      {showPrompt && (
        <>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
            {isWishlisted
              ? "This recipe has been added to your Cookbook"
              : "This recipe has been remove from your Cookbook"}
          </div>
        </>
      )}
    </div>
  );
}
