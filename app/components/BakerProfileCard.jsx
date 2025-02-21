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
