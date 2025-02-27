"use client";
import { useState } from "react";
import Image from "next/image";

export default function BakerProfileCard({ baker }) {
  const [followers, setFollowers] = useState(baker.followers);
  const [isFollowed, setIsFollowed] = useState(baker?.isFollowed);

  // Handle Follow Button Click
  const handleFollow = () => {
    setIsFollowed(true);
    setFollowers((prev) => prev + 1);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl text-center">
      <div className="flex items-center justify-center gap-3">
        {/* User Profile Picture */}
        <div className="relative flex-shrink-0">
          <img
            src={baker?.image}
            alt={baker?.name}
            className="w-14 h-14 sm:w-14 sm:h-14 rounded-full object-cover border border-gray-300"
          />
          {baker?.isVerified && (
            <div className="absolute -bottom-0 -right-0 bg-white rounded-full p-px shadow-sm">
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
      </div>

      {/* Baker Name & Followers */}
      <div className="flex justify-center items-center mt-2">
        <h2 className="text-lg font-semibold">{baker.name}</h2>
      </div>

      <p className="text-gray-500 text-sm">{followers} Followers</p>

      {/* Country & Flag */}
      <div className="flex items-center justify-center mt-2 gap-2">
        <Image
          src={baker.flag}
          alt={baker.country}
          width={20}
          height={15}
          className="w-6 h-4"
        />
        <span className="text-gray-600 text-sm">{baker.country}</span>
      </div>

      {/* Follow Button */}
      <button
        style={{
          backgroundColor: isFollowed ? "#ffff" : "#673AB7",
          color: isFollowed ? "#808080" : "white", // Gray text if followed
          fontWeight: isFollowed ? "bold" : "normal", // Bold text if followed
          cursor: isFollowed ? "not-allowed" : "pointer", // Change cursor to indicate it's disabled
          opacity: isFollowed ? 0.6 : 1, // Reduce opacity when disabled
        }}
        className={`py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-colors duration-300 ${
          isFollowed ? "w-[40px] px-0 sm:w-auto" : "px-2"
        }`}
        onClick={handleFollow}
        disabled={isFollowed} // Disables the button when isFollowed is true
      >
        {isFollowed ? "Followed" : "Follow"}
      </button>
    </div>
  );
}
