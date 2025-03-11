"use client";
import { useState } from "react";
import Image from "next/image";

export default function ArtistProfileCard({ artist }) {
  const [isFollowed, setIsFollowed] = useState(artist?.isFollowed);
  const [followers, setFollowers] = useState(artist.followers);

  const handleFollow = () => {
    setIsFollowed(true);
    setFollowers((prev) => prev + 1);
  };

  return (
    <div className="relative p-3 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Country Flag - Top Right */}
      <div className="absolute pl-3 top-4  left-0 flex items-center gap-1 backdrop-blur-sm  py-1 rounded-full">
        <Image
          src={artist.flag}
          alt={artist.country}
          width={16}
          height={12}
          className="w-4 h-3 rounded-sm"
        />
      </div>

      {/* Profile Image */}
      <div className="relative left-0 mx-auto mb-1 w-32 h-32">
        <Image
          src={artist.image}
          alt={artist.name}
          width={150}
          height={150}
          className="rounded-full object-cover border-2 border-purple-100"
        />
        {artist?.isVerified && (
          <div className="absolute bottom-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
            <svg
              className="w-5 h-5 text-purple-600 fill-current"
              viewBox="0 0 20 20"
              aria-label="Verified Artist"
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

      {/* Artist Name */}
      <p className="text-xm text-left font-semibold text-purple-800 mb-2">
        {artist.name}
      </p>
      {/* Artist Bio */}
      <div className="  flex items-start space-x-2 max-w-xs mx-auto sm:max-w-sm">
        <button className="px-2 py-1 text-[10px] bg-purple-500 text-white rounded">
          About
        </button>
        <p className="text-[10px] text-gray-600 line-clamp-3">
          I love to cook, that's why I am an artist.
        </p>
      </div>
    </div>
  );
}
