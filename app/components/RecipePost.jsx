"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import { assets } from "@/assets/assets";
import dayjs from "dayjs";
import { FaEyeSlash } from "react-icons/fa";

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
  const [displayDate, setDisplayDate] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [followers, setFollowers] = useState(() => {
    const baker = bakers.find((b) => b.id === bakerId);
    return baker ? baker.followers : 0;
  });
  const [isWishlisted, setIsWishlisted] = useState(false);

  const baker = bakers.find((b) => b.id === bakerId);
  useEffect(() => {
    const formattedDate = dayjs(date);
    const today = dayjs();
    const yesterday = today.subtract(1, "day");

    if (formattedDate.isSame(today, "day")) {
      setDisplayDate("Today");
    } else if (formattedDate.isSame(yesterday, "day")) {
      setDisplayDate("Yesterday");
    } else {
      setDisplayDate(formattedDate.format("MMM D, YYYY"));
    }
  }, [date]);
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
    <div className="w-full mx-0 p-0 py-4 sm:p-4 shadow-lg rounded-2xl sm:mx-auto sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-[#673AB7] font-semibold text-xs sm:text-sm">
          {displayDate}
        </div>
        <div className="flex gap-2 sm:gap-3">
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
          <button
            // onClick={handleHide} // Add your hide functionality here
            className="flex items-center justify-center text-lg sm:text-xl"
            title="Hide Post"
          >
            <FaEyeSlash className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
          </button>
        </div>
      </div>

      {/* Baker Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
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
            <div className="flex flex-wrap gap-2 mt-1">
              {baker?.isTop10Sales && (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Top 10 Sales
                </span>
              )}
              {baker?.isTop10Followers && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Top 10 Followers
                </span>
              )}
            </div>
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
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[#9c51ac] mb-2  ">
        <h4 className=" text-xs text-black sm:text-xs font-semibold">
          Overall Recipe Reviews:
        </h4>
        <div className="flex items-center gap-1">
          <span className="text-sm sm:text-lg">{renderStars(rating)}</span>
          <span className="text-gray-600 text-xs sm:text-sm">
            ({rating.toFixed(1)}/5.0)
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-700 text-justify text-sm sm:text-base">
        {description}
      </p>

      <button
        className="mt-2 px-3 py-1 text-xs sm:text-sm font-semibold rder  border-blue-500 rounded-lg 
                    transition-all duration-300 ease-in-out w-full sm:w-auto"
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
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 mt-4 w-full overflow-x-auto sm:overflow-visible pb-1">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Share Recipe"
        >
          <Image
            src={assets.share_icon}
            alt="Share"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </button>

        {/* Tip Button */}
        <button
          // onClick={handleTip}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Leave Tip"
        >
          <Image
            src={assets.tip_icon}
            alt="Tip"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          title="Add to Wishlist"
        >
          <span className="font-normal text-xs sm:text-sm text-gray-700">
            Wishlist
          </span>
          <span
            className={`text-lg sm:text-xl ${
              isWishlisted ? "text-red-700" : "text-gray-500"
            }`}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </span>
        </button>

        {/* Cart & Price */}

        <button
          //onClick={handleShare}
          className="hover:scale-105  flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          title="Add to Cart"
        >
          <Image
            src={assets.cart}
            alt="Cart"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
          <span className="font-medium text-xs sm:text-sm text-gray-900">
            ${price.toFixed(3)}
          </span>
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
