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
      <h2 className="text-lg font-semibold mt-2">{baker.name}</h2>
      <p className="text-gray-500 text-sm">{followers} Followers</p>

      {/* Country & Flag */}
      <div className="flex items-center justify-center mt-2 gap-2">
        <Image src={baker.flag} alt={baker.country} width={20} height={15} className="w-6 h-4" />
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


