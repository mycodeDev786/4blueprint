"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";

export default function RecipePost({ title, description, image, bakerId, date, ingredients, price, rating }) {
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
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl relative">
      {/* Top Section: Date, Wishlist & Share */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-gray-500 text-sm">⏰ {date}</div>
        <div className="flex gap-3">
          <button onClick={handleWishlist} className="text-xl" title="Add to Wishlist">
            {isWishlisted ? "❤️" : "🤍"}
          </button>
          <button onClick={handleShare} className="text-xl" title="Share Recipe">
            📢
          </button>
        </div>
      </div>

      {/* Baker Profile: Name, Flag, Country, Followers & Follow Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={baker?.image}
            alt={baker?.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {baker?.name} ✅
              <span className="flex items-center gap-1 cursor-pointer" onClick={handleFlagClick}>
                {baker?.flag && <Image src={baker?.flag} alt={baker?.country} width={24} height={16} className="rounded-sm" />}
                {baker?.country}
              </span>
            </h2>
            {/* Followers count below the name */}
            <p className="text-gray-500 text-sm">{followers} Followers</p>
          </div>
        </div>

        {/* Follow Button at the End */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm" onClick={handleFollow}>
          Follow
        </button>
      </div>

      {/* Country Popup Modal */}
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
{/* Recipe Reviews (Centered) */}
<div className="flex items-center gap-2 text-yellow-500 mb-2 justify-center text-center">
  <h4 className="text-lg font-semibold">Overall Recipe Reviews:</h4>
  <span className="text-lg">{renderStars(rating)}</span>
  <span className="text-gray-600 text-sm">({rating.toFixed(1)})</span>
</div>

      {/* Recipe Title and Description */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 text-justify">{ description}</p>

      <button 
  className="mt-1 px-4 py-1 text-sm font-semibold text-blue-600 border border-blue-500 rounded-lg 
             hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
  onClick={() => setExpanded(!expanded)}
>
  {expanded ? "Show Less" : "See More"}
</button>


      {/* Expanded View */}
{expanded && (
  <div className="mt-3 p-2 bg-gray-100 rounded-lg">
    <h4 className="font-semibold">Ingredients:</h4>
    <p className="text-gray-600">{ingredients}</p>
    <p className="mt-2 text-gray-500 italic">
      If you’d like to know how to prepare this delicious recipe, just purchase it from this baker. We really appreciate your support!
    </p>
    <p className="mt-2 font-semibold text-orange-500">Price: ${price.toFixed(2)}</p>
  </div>
)}


      {/* Recipe Image */}
      <div className="mt-4">
        <Image src={image} alt={title} className="w-full h-[250px] rounded-lg object-cover" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">Tip the Baker</button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">Buy this Recipe</button>
      </div>
    </div>
  );
}
