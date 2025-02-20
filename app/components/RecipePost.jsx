"use client";
import { useState } from "react";
import Image from "next/image";

export default function RecipePost({ title, description, image, baker, profileImage, date }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl">
      {/* Date and Time from Recipes List */}
      <div className="flex justify-between text-gray-500 text-sm mb-2">
        <span className="flex items-center gap-1">
          ⏰ {date} {/* Now using the passed date instead of new Date().toLocaleString() */}
        </span>
      </div>

      {/* Profile Picture and Baker Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profileImage}
          alt={baker}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{baker}</h2>
          <p className="text-gray-500 text-sm">Pastry Chef</p>
        </div>
      </div>

      {/* Recipe Title and Description */}
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">
          {expanded ? description : description.slice(0, 50) + "..."}
        </p>
        <button
          className="text-blue-500 mt-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      </div>

      {/* Recipe Image - Fixed */}
      <div className="mt-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            className="w-full h-[200px] rounded-lg object-cover"
          />
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
          Tip the Baker
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
          Buy this Recipe
        </button>
      </div>
    </div>
  );
}
