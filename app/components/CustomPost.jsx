import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const CustomPost = ({ content, onRead }) => {
  return (
    <div className="custom-post max-w-lg mx-auto p-4 mt-6 bg-white shadow-lg rounded-2xl relative w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      {/* Header Row */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h2 className="font-bold text-lg">Greatest Recipe</h2>
        <span className="font-bold text-sm">Info Zone</span>
      </div>

      {/* Two Paragraphs */}
      <p className="text-gray-700 mb-2">
        Discover the most exquisite flavors with our specially curated recipes.
        These dishes are selected from the finest kitchens worldwide.
      </p>
      <p className="text-gray-700 mb-3">
        Stay tuned for more mouthwatering recipes and pro tips to elevate your
        cooking experience!
      </p>

      {/* Image (Placeholder) */}
      <Image
        src={assets.logo}
        alt="Greatest Recipe"
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      {/* Custom Post Content & Button */}
      <p className="text-gray-800">{content}</p>
      <button
        onClick={onRead}
        className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Mark as Read
      </button>
    </div>
  );
};

export default CustomPost;
