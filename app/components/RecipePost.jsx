"use client";
import { useState } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import { assets } from "@/assets/assets";

export default function RecipePost({
  title,
  description,
  image,
  bakerId,
  date,
  ingredients,
  price,
  rating,
}) {
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

  const handleReport = () => {
    alert("Report submitted! Thank you for your feedback.");
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
        <div className="text-[#673AB7] font-semibold text-xs sm:text-sm">
          {" "}
          {date}
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleWishlist}
            className="text-lg sm:text-xl"
            title="Add to Wishlist"
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>

          <button
            onClick={handleReport}
            className="text-lg sm:text-xl"
            title="Report Recipe"
          >
            <svg
              className="w-6 h-6 text-black-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 21V3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path d="M5 4H15L12 7.5L15 11H5V4Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Baker Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={baker?.image}
              alt={baker?.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
            />
            {baker?.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-px shadow-sm">
                <svg
                  className="w-4 h-4 text-blue-600 fill-current"
                  viewBox="0 0 20 20"
                  aria-label="Verified Account"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap text-black">
              <span className="truncate">{baker?.name}</span>
              <span
                className="ml-3 flex items-center gap-1 cursor-pointer"
                onClick={handleFlagClick}
              >
                {baker?.flag && (
                  <Image
                    src={baker?.flag}
                    alt={baker?.country}
                    width={24}
                    height={16}
                    className="rounded-sm flex-shrink-0"
                  />
                )}
                <span className="text-sm sm:text-base truncate">
                  {baker?.country}
                </span>
              </span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {followers} Followers
            </p>
          </div>
        </div>

        <button
          style={{ backgroundColor: "#673AB7" }}
          className="  text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap"
          onClick={handleFollow}
        >
          Follow
        </button>
      </div>

      {/* Recipe Reviews */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-yellow-500 mb-2 justify-center text-center">
        <h4 className="text-sm sm:text-lg font-semibold">
          Overall Recipe Reviews:
        </h4>
        <div className="flex items-center gap-1">
          <span className="text-sm sm:text-lg">{renderStars(rating)}</span>
          <span className="text-gray-600 text-xs sm:text-sm">
            ({rating.toFixed(1)})
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 text-justify text-sm sm:text-base">
        {description}
      </p>

      <button
        className="mt-2 px-3 py-1 text-xs sm:text-sm font-semibold text-white bg-[#673AB7] border border-blue-500 rounded-lg 
                   hover:bg-[#673AB7] hover:text-white transition-all duration-300 ease-in-out w-full sm:w-auto"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "See More"}
      </button>

      {/* Recipe Image with Overlay Content */}
      <div className="mt-4 aspect-video overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
            expanded ? "opacity-30 scale-90" : ""
          }`}
        />

        {/* Expanded Content Overlay */}
        {expanded && (
          <div className="absolute inset-0 p-4 flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-2 rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors z-10 "
            >
              <svg
                className="w-8 h-8 ml-1"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" className="fill-red-600" />
                <path
                  d="M15.5 8.5l-7 7M8.5 8.5l7 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Overlay Content */}
            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg overflow-auto flex-1">
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <p className="text-gray-700 font-medium whitespace-pre-line">
                {ingredients}
              </p>
              <p className="mt-3 text-gray-600 italic text-sm">
                If you’d like to know how to prepare this delicious recipe, just
                purchase it from this artist. We really appreciate your support!
              </p>
              <p className="mt-3 font-semibold text-orange-500">
                Price: ${price.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex  flex-row gap-2 mt-4 w-full">
        <button
          onClick={handleShare}
          className="text-lg sm:text-xl"
          title="Share Recipe"
        >
          <Image
            src={assets.tip_icon}
            alt="Upload Icon"
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
        <button
          onClick={handleShare}
          className="text-lg sm:text-xl"
          title="Share Recipe"
        >
          <Image
            src={assets.share_icon}
            alt="Share Icon"
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
        <button
          onClick={handleShare}
          className="text-lg sm:text-xl"
          title="Share Recipe"
        >
          <Image
            src={assets.cart}
            alt="Upload Icon"
            width={20}
            height={20}
            className="ml-2"
          />
        </button>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-scaleIn">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200 text-center">
                Baker's Origin
              </h3>

              <div className="space-y-3">
                <p className="text-lg font-medium text-indigo-700 text-center">
                  <span className="font-semibold">
                    This baker is from {baker?.country}
                  </span>
                </p>

                <p className="text-gray-600 leading-relaxed text-justify">
                  Understanding a baker's cultural background enhances your
                  appreciation of their craft. Each region brings unique flavors
                  and traditions to their recipes. We recommend trying this
                  creation — it might just become a new favorite in your
                  culinary repertoire.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
              <button
                onClick={closePopup}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
