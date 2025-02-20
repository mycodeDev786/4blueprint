"use client";
import { useState } from "react";
import Image from "next/image";

const bakers = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    followers: 320,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    followers: 450,
  },
];

export default function RecipePost({ title, description, image, bakerId, date, ingredients, price, rating }) {
  const [expanded, setExpanded] = useState(false);
  const [followers, setFollowers] = useState(() => {
    const baker = bakers.find((b) => b.id === bakerId);
    return baker ? baker.followers : 0;
  });

  // Find the baker using bakerId
  const baker = bakers.find((b) => b.id === bakerId);

  // Handle Follow Button Click
  const handleFollow = () => {
    setFollowers((prev) => prev + 1);
  };

  // Generate stars based on rating
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl">
      {/* Date */}
      <div className="flex justify-between text-gray-500 text-sm mb-2">
        <span>⏰ {date}</span>
      </div>

      {/* Baker Profile */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={baker?.image}
            alt={baker?.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold">{baker?.name}</h2>
            <p className="text-gray-500 text-sm">{followers} Followers</p>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
          onClick={handleFollow}
        >
          Follow
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 mb-2">
        <span className="text-lg">{renderStars(rating)}</span>
        <span className="text-gray-600 text-sm">({rating.toFixed(1)})</span>
      </div>

      {/* Recipe Title and Description */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">
        {expanded ? description : description.slice(0, 50) + "..."}
      </p>

      <button
        className="text-blue-500 mt-1"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </button>

      {/* Expanded View (Ingredients & Price) */}
      {expanded && (
        <div className="mt-3 p-2 bg-gray-100 rounded-lg">
          <h4 className="font-semibold">Ingredients:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Price: ${price.toFixed(2)}</p>
        </div>
      )}

      {/* Recipe Image */}
      <div className="mt-4">
        <Image src={image} alt={title} className="w-full h-[200px] rounded-lg object-cover" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
          Tip the Baker
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
          Buy this Recipe
        </button>
      </div>
    </div>
  );
}
