"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import { assets } from "@/assets/assets";

export default function AllRecipePageCard({
  id,
  title,
  description,
  image,
  bakerId,
  price,
  rating,
  isPurchased,
}) {
  const baker = bakers.find((b) => b.id === bakerId);

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl overflow-hidden sm:mx-auto mx-0">
      <div className="w-full h-48 sm:h-56">
        <Image src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 sm:p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h2>
        <p className="text-purple-700 font-bold text-xs sm:text-sm">
          {baker.name}
        </p>
        <span className="flex items-center gap-1 cursor-pointer">
          {baker?.flag && (
            <Image
              src={baker?.flag}
              alt={baker?.country}
              width={20}
              height={14}
              className="rounded-sm flex-shrink-0"
            />
          )}
          <span className="text-xs sm:text-base truncate">
            {baker?.country}
          </span>
        </span>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base sm:text-lg font-bold text-green-600">
            ${price}
          </span>
          <div className="flex items-center text-[#9c51ac] gap-1">
            <button className="border rounded-md px-1 sm:px-2 border-purple-700 text-xs sm:text-sm">
              <span className="text-xs sm:text-lg">{renderStars(rating)}</span>
              <span className="text-gray-600 text-[10px] sm:text-sm">
                ({rating.toFixed(1)}/5.0)
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
