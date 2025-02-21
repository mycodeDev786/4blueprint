"use client";
import { useState } from "react";
import Image from "next/image";

const bakers = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    followers: 320,
    country: "USA",
    flag: "https://flagcdn.com/w40/us.png", // USA Flag Image
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    followers: 450,
    country: "UK",
    flag: "https://flagcdn.com/w40/gb.png", // UK Flag Image
  },
];

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
  const handleFlagClick = () => {
    setIsPopupOpen(true); // Show popup when flag is clicked
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Hide popup
  };

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this recipe: ${title}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl relative">
      {/* Top Section with Flag, Country, Date, and Wishlist/Share Icons */}
      <div className="flex justify-between items-center mb-2">

         {/* Date */}
         <div className="text-gray-500 text-sm">⏰ {date}</div>
        {/* Country Flag and Name */}
        <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleFlagClick}>
          <Image src={baker?.flag} alt={baker?.country} width={24} height={16} className="rounded-sm" />
          <span className="text-lg font-semibold">{baker?.country}</span>
        </div>

       
      </div>

       {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold">This artist is from {baker?.country}.</p>
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

        {/* Wishlist & Share Icons */}
        <div className="flex gap-3">
          <button onClick={handleWishlist} className="text-xl" title="Add to Wishlist">
            {isWishlisted ? "❤️" : "🤍"}
          </button>
          <button onClick={handleShare} className="text-xl" title="Share Recipe">
            📤
          </button>
        </div>
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
