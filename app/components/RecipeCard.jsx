"use client";

import Image from "next/image";
import { FaShoppingCart, FaShareAlt, FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart } from "../store/cartSlice";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import { removeFromWishlist } from "../store/wishlistSlice";
import { addToArchive, removeFromArchive } from "../store/archiveSlice";
import { bakers } from "../constants/bakers";

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const baker = bakers.find((b) => b.id === recipe.bakerId);
  const wishlist = useSelector((state) => state.archive.items);
  const isWishlisted = wishlist.some((item) => item.id === recipe.id);
  const [showPrompt, setShowPrompt] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  const handleArtist = () => {
    router.push(`artistProfile?name=${encodeURIComponent(recipe.artistName)}`);
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist(recipe.id));
  };

  const handleArchive = () => {
    setShowPrompt(true);

    setTimeout(() => {
      setShowPrompt(false);
    }, 2500);
    if (isWishlisted) {
      dispatch(removeFromArchive(recipe.id));
    } else {
      dispatch(
        addToArchive({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          image: recipe.image,
          price: recipe.price,
          bakerId: recipe.bakerId,
          isPurchased: recipe.isPurchased,
          artistName: baker.name,
          // Default quantity
        })
      );
    }
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        image: recipe.image,
        price: recipe.price,
        bakerId: recipe.bakerId,
        quantity: 1,
      })
    );
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 border border-gray-200 relative">
      {/* Recipe Image */}
      <div
        className="relative overflow-hidden rounded-lg cursor-pointer"
        onClick={() => setIsClicked(true)}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          className="w-32 h-32 rounded-lg object-cover transition-transform duration-300"
        />
        {!recipe.isPurchased && (
          <div className="absolute bottom-7 left-0 w-full bg-white bg-transparent bg-opacity-60 text-black text-center text-xs md:text-sm font-semibold rounded-b-lg">
            RECIPE LOCKED
          </div>
        )}
      </div>

      {isClicked && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsClicked(false)}
        >
          <div className="relative w-[50vw] h-[50vh] bg-white p-4 rounded-lg shadow-xl">
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </div>
      )}

      {/* Three-dot Menu */}
      <div className="absolute top-2 right-2 menu-container">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <FaEllipsisH className="text-gray-700 text-lg" />
        </button>
        {menuOpen && (
          <div className="absolute top-[-1px] right-0 w-52 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                handleArchive();
                setMenuOpen(false);
              }}
            >
              Archive
            </button>
            <button
              className="w-full text-sm text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                handleRemove();
              }}
            >
              Remove from CookBook
            </button>
          </div>
        )}
      </div>

      {/* Recipe Details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <div className="flex flex-row">
          <h4 className="text-sm font-semibold text-black mr-2">By</h4>
          <button
            onClick={handleArtist}
            className="text-sm font-semibold text-purple-700"
          >
            {recipe.artistName}
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Ingredients: {recipe.ingredients}
        </p>

        <div className="mt-2 flex items-center">
          {!recipe.isPurchased ? (
            <div className="text-orange-600 font-semibold">
              <button
                onClick={handleBuyNow}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full transition-transform transform hover:scale-105"
                title="Add to Cart"
              >
                <FaShoppingCart className="text-gray-700 text-lg" />
                <span className="font-medium text-sm text-gray-900">
                  (${recipe.price.toFixed(2)})
                </span>
              </button>
            </div>
          ) : null}
          {/* Share Button */}
          <button
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-200 rounded-full transition-colors"
            title="Share Recipe"
          >
            <FaShareAlt className="text-gray-700 text-lg" />
          </button>
          <div className="ml-auto">
            <button className="w-20 h-20 flex items-center justify-center font-bold border-2 hover:bg-gray-200 rounded-full transition-transform transform hover:scale-105">
              <Image src={assets.read_icon} alt="read icon" />
            </button>
          </div>
        </div>
      </div>
      {/* Prompt Message */}
      {showPrompt && (
        <>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
            {isWishlisted
              ? "This recipe has been added to your Archive list"
              : "This recipe has been remove from your Archive list"}
          </div>
        </>
      )}
    </div>
  );
}
