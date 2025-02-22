"use client";
import { useState } from "react";
import Image from "next/image";

export default function BakerProfileCard({ baker }) {
  const [followers, setFollowers] = useState(baker.followers);

  // Handle Follow Button Click
  const handleFollow = () => {
    setFollowers((prev) => prev + 1);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl text-center">
      {/* Baker Image */}
      <Image
        src={baker.image}
        alt={baker.name}
        width={80}
        height={80}
        className="w-20 h-20 mx-auto rounded-full object-cover border border-gray-300"
      />

      {/* Baker Name & Followers */}
      <div className="flex justify-center items-center mt-2">
        <h2 className="text-lg font-semibold">{baker.name}</h2>
        {baker?.isVerified && (
          <span title="Verified" className="text-blue-500 ml-2">
            <svg
              className="w-5 h-5 ml-1 text-violet-700 fill-current"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
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
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        onClick={handleFollow}
      >
        Follow
      </button>
    </div>
  );
}
