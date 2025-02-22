"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";

export default function RecipePost({ title, description, image, bakerId, date, ingredients, price, rating }) {
  // ... [keep all the existing state and handler functions] ...
  const [expanded, setExpanded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [followers, setFollowers] = useState(() => {
    const baker = bakers.find((b) => b.id === bakerId);
    return baker ? baker.followers : 0;
  });
  const [isWishlisted, setIsWishlisted] = useState(false);

  const baker = bakers.find((b) => b.id === bakerId);

  const handleFollow = () => {
    setFollowers((prev) => prev + 1);
  };

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Check out this recipe: ${title}!`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  const handleFlagClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
  };
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl relative w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-gray-500 text-xs sm:text-sm">⏰ {date}</div>
        <div className="flex gap-2 sm:gap-3">
          <button onClick={handleWishlist} className="text-lg sm:text-xl" title="Add to Wishlist">
            {isWishlisted ? "❤️" : "🤍"}
          </button>
          <button onClick={handleShare} className="text-lg sm:text-xl" title="Share Recipe">
            📢
          </button>
        </div>
      </div>

      {/* Baker Profile Section - Improved for mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img
            src={baker?.image}
            alt={baker?.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
          />
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap">
              <span className="truncate">{baker?.name} ✅</span>
              <span className="flex items-center gap-1 cursor-pointer" onClick={handleFlagClick}>
                {baker?.flag && (
                  <Image 
                    src={baker?.flag} 
                    alt={baker?.country} 
                    width={24} 
                    height={16} 
                    className="rounded-sm flex-shrink-0"
                  />
                )}
                <span className="text-sm sm:text-base truncate">{baker?.country}</span>
              </span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">{followers} Followers</p>
          </div>
        </div>

        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap"
          onClick={handleFollow}
        >
          Follow
        </button>
      </div>

      {/* Recipe Reviews */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-yellow-500 mb-2 justify-center text-center">
        <h4 className="text-sm sm:text-lg font-semibold">Overall Recipe Reviews:</h4>
        <div className="flex items-center gap-1">
          <span className="text-sm sm:text-lg">{renderStars(rating)}</span>
          <span className="text-gray-600 text-xs sm:text-sm">({rating.toFixed(1)})</span>
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 text-justify text-sm sm:text-base">{description}</p>

      <button 
        className="mt-2 px-3 py-1 text-xs sm:text-sm font-semibold text-blue-600 border border-blue-500 rounded-lg 
                   hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out w-full sm:w-auto"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "See More"}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-sm sm:text-base">
          <h4 className="font-semibold mb-1">Ingredients:</h4>
          <p className="text-gray-600 whitespace-pre-line">{ingredients}</p>
          <p className="mt-2 text-gray-500 italic text-sm">
            If you’d like to know how to prepare this delicious recipe, just purchase it from this baker. We really appreciate your support!
          </p>
          <p className="mt-2 font-semibold text-orange-500">Price: ${price.toFixed(2)}</p>
        </div>
      )}

      {/* Recipe Image */}
      <div className="mt-4 aspect-video overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          width={600} 
          height={400} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base">
          Tip the Baker
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base">
          Buy this Recipe
        </button>
      </div>

      {/* Popup Modal (unchanged) */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold">This baker is from {baker?.country}.</p>
            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}