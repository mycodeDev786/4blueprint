"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { bakers } from "../constants/bakers";
import { assets } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "../store/cartSlice";
import { ratings } from "../constants/rating";
import { apiRequest } from "../utils/apiHelper";
import { setTemp, clearTemp } from "../store/tempSlice";

import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import dayjs from "dayjs";
import {
  FaEyeSlash,
  FaShareAlt,
  FaBookMedical,
  FaShoppingCart,
  FaMoneyBillWave,
  FaEllipsisH,
} from "react-icons/fa";
import API_ENDPOINTS from "../utils/api";

export default function RecipePost({
  id,
  title,
  description,
  image,
  bakerId,
  bakerName,
  date,
  bakerCountry,
  ingredients,
  price,
  rating,
  isPurchased,
  bakerFlag,
  profileImage,
  followersCount,
}) {
  const [expanded, setExpanded] = useState(false);
  const [displayDate, setDisplayDate] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [followers, setFollowers] = useState(() => {
    const baker = bakers.find((b) => b.id === bakerId);
    return baker ? baker.followers : 0;
  });
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === id);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const baker = bakers.find((b) => b.id === bakerId);
  const [isFollowed, setIsFollowed] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImageSlider = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
    setIsSliderOpen(true);
  };

  useEffect(() => {
    if (!user?.id) return; // Ensure user is logged in

    apiRequest(
      `${API_ENDPOINTS.FOLLOWERS.IS_FOLLOWING(bakerId, user.id)}`,
      "GET",
      null
    )
      .then((response) => {
        setIsFollowed(response.isFollowing);
      })
      .catch((error) => {
        console.error("Error checking follow status:", error);
      })
      .finally(() => {});
  }, [bakerId, user?.id]);

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

  const closeImageSlider = () => {
    setIsSliderOpen(false);
    setSelectedImages([]);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

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
  const handleFollow = async () => {
    if (user) {
      setIsFollowed((prev) => !prev);
      try {
        // Follow API call
        await apiRequest(`${API_ENDPOINTS.FOLLOWERS.FOLLOW}`, "POST", {
          baker_id: bakerId,
          follower_id: user.id,
        });
        setIsFollowed(true);
        router.push("/");
      } catch (error) {
        console.error("Error toggling follow status:", error);
      } finally {
      }
    } else {
    }
  };
  const handleArtist = () => {
    router.push(`/artist-page?id=${bakerId}`);
  };

  const handleHide = () => {
    setIsHidden(true);
  };
  const handleBuyNow = () => {
    // Dispatching the item details to the cart
    dispatch(
      addToCart({
        id,
        title,
        description,
        image,
        price,
        bakerId,
        quantity: 1, // Default quantity set to 1
      })
    );

    // Redirect to the cart page
    // router.push("/cart");
  };
  const handleRatingClick = () => {
    setIsRatingModalOpen(true); // Open modal to display existing ratings
  };

  const handleRecipeClick = () => {
    dispatch(clearTemp());
    dispatch(setTemp(title + " by " + bakerName));
    router.push(`/recipe-page?id=${id}`);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const handleWishlist = () => {
    setShowPrompt(true);

    setTimeout(() => {
      setShowPrompt(false);
    }, 2500);
    if (user) {
      if (isWishlisted) {
        dispatch(removeFromWishlist(id));
      } else {
        dispatch(
          addToWishlist({
            id,
            title,
            description,
            ingredients,
            image,
            price,
            bakerId,
            isPurchased,
            artistName: bakerName,
            // Default quantity
          })
        );
      }
    } else {
    }
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
  const getRatingLabel = (rating) => {
    if (rating > 90) return "Excellent";
    if (rating > 80) return "Very Good";
    if (rating > 70) return "Good";
    if (rating > 60) return "Best";
    if (rating > 50) return "Satisfactory";
    return "Poor";
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const renderStars = (rating) => {
    if (rating !== 0.0) {
      return "★".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "☆" : "");
    } else {
      return " No rating";
    }
  };

  return !isHidden ? (
    <div className="max-w-lg  mx-auto p-4 bg-white shadow-lg rounded-2xl relative w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-[#673AB7] font-semibold text-xs sm:text-sm">
          {displayDate}
        </div>
        {/* Three-dot Menu */}
        <div className="absolute top-2 right-2 menu-container">
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            <FaEllipsisH size={12} className="text-gray-700 text-lg" />
          </button>
          {menuOpen && (
            <div className="absolute top-[-1px] right-0 w-16  bg-white border border-gray-300 shadow-lg rounded-lg z-50 flex flex-col items-center justify-end space-x-2 p-2">
              <button onClick={handleReport}>
                <span className=" text-[12px] font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                  Report
                </span>
              </button>
              <button onClick={handleHide}>
                <span className=" text-[12px] font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                  Hide
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Baker Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src={`${API_ENDPOINTS.STORAGE_URL}${profileImage}`}
              alt={bakerName}
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
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1 flex-wrap text-black">
              <button onClick={handleArtist} className="truncate">
                {bakerName}
              </button>
              <span
                className="ml-3 flex items-center gap-1 cursor-pointer"
                onClick={handleFlagClick}
              >
                {bakerFlag && (
                  <Image
                    src={bakerFlag}
                    alt={bakerCountry}
                    width={24}
                    height={16}
                    className="rounded-sm flex-shrink-0"
                  />
                )}
                <span className="text-sm sm:text-base truncate">
                  {bakerCountry}
                </span>
              </span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              <strong>{followersCount}</strong> Followers || Artist Rating:{" "}
              {baker?.rating ? (
                <>
                  <strong>{baker.rating}%</strong> (
                  {getRatingLabel(baker.rating)})
                </>
              ) : (
                <strong>No Rating</strong>
              )}
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
      {/* Recipe Reviews */}
      {/* Title and Description */}
      <div className="flex flex-row sm:flex-row justify-between  gap-1 sm:gap-2 text-[#9c51ac] mb-2  ">
        <h3 className="text-lg sm:text-xl font-bold  text-black">{title}</h3>
        {/* <h4 className=" text-xs text-black sm:text-xs font-semibold">
          Overall Recipe Reviews:
        </h4> */}
        {rating === "0.00" ? (
          <span className="text-purple-600 text-xs sm:text-sm">
            No rating available
          </span>
        ) : (
          <div className="flex items-center py-0 md:py-1  gap-1">
            <button
              className="border rounded-lg px-1 border-purple-700"
              onClick={handleRatingClick}
            >
              <span className="text-sm sm:text-lg">{renderStars(rating)}</span>
              <span className="text-gray-600 text-xs sm:text-sm">
                {rating} / 5.0
              </span>
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-700 text-left text-sm sm:text-base">
        {description}
      </p>
      <button
        className={`mt-2 px-3 py-1 text-xs sm:text-sm font-semibold border-2 border-black rounded-lg 
              transition-all duration-300 ease-in-out w-full sm:w-auto 
              ${
                expanded ? "bg-black text-white" : "bg-transparent text-black"
              }`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "See More"}
      </button>
      {/* Recipe Image with Overlay Content */}
      <div
        onClick={handleRecipeClick}
        className="mt-4 cursor-pointer aspect-video overflow-hidden relative"
      >
        <Image
          src={`${API_ENDPOINTS.STORAGE_URL}${image}`}
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
              <p className="mt-3 text-gray-600  italic text-sm">
                If you’d like to know how to prepare this delicious recipe, just
                purchase it from this artist. We really appreciate your support!
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-4 w-full overflow-x-auto sm:overflow-visible pb-1">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full transition-colors"
          title="Share Recipe"
        >
          <FaShareAlt className="text-gray-700 text-lg" />
        </button>

        {/* Tip Button */}
        <button
          className="flex items-center justify-center w-10 h-10 bg-white  rounded-full transition-colors"
          title="Leave Tip"
        >
          <FaMoneyBillWave className="text-gray-700 text-lg" />
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="flex items-center gap-2 px-4 py-2 bg-white  border border-gray-300 rounded-full transition-colors"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? (
            // Solid book icon
            <Image
              src={assets.removecook}
              alt="Custom Icon"
              className="w-5 h-5"
            /> // Outlined book icon
          ) : (
            <Image
              src={assets.addcook}
              alt="Custom Icon"
              className="w-5 h-5 bg-white "
            /> // Outlined book icon
          )}
          <span className="font-medium text-[7px] sm:text-xs text-gray-700">
            {isWishlisted ? "Remove from CookBook" : "Add to CookBook"}
          </span>
        </button>

        {/* Cart & Price */}
        <button
          onClick={handleBuyNow}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-200 border border-gray-300 rounded-full transition-transform transform hover:scale-105 transition-colors"
          title="Add to Cart"
        >
          <FaShoppingCart className="text-gray-700 text-lg" />
          <span className="font-medium text-sm text-gray-900">${price}</span>
        </button>
      </div>
      {/* Prompt Message */}
      {showPrompt && (
        <>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white text-sm px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
            {user
              ? isWishlisted
                ? "This recipe has been added to your Cookbook"
                : "This recipe has been remove from your Cookbook"
              : "Login to continue"}
          </div>
        </>
      )}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-fadeIn">
          {/* Image Slider */}
          {isSliderOpen && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg z-50 w-3/4 max-w-3xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold"></h3>
                <button
                  onClick={closeImageSlider}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="relative flex items-center justify-center">
                <button
                  onClick={prevImage}
                  className="absolute left-2 text-xl font-bold bg-gray-200 px-2 py-1 rounded-full"
                >
                  ◀
                </button>
                <Image
                  src={selectedImages[currentIndex]}
                  alt="Review"
                  className="w-64 h-64 object-cover rounded-md border"
                />
                <button
                  onClick={nextImage}
                  className="absolute right-2 text-xl font-bold bg-gray-200 px-2 py-1 rounded-full"
                >
                  ▶
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full transform transition-all duration-300 animate-scaleIn">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200 text-center">
                {title + "'s"} Reviews
              </h3>

              {/* Display All Ratings */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {ratings.length > 0 ? (
                  ratings.map((review) => (
                    <div key={review.id} className="border p-4 rounded-lg">
                      <div className="flex items-center gap-3">
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
                        {/* User Name & Rating */}
                        <div>
                          <h4 className="font-medium">{baker.name}</h4>
                          <span className="text-[#9c51ac]">
                            {renderStars(review.rating)}
                          </span>
                          <span className="text-[#9c51ac] text-xs ml-1 sm:text-sm">
                            ({review.rating.toFixed(1)}/5.0)
                          </span>
                        </div>
                      </div>
                      {/* Review Comment */}
                      <p className="text-gray-600 mt-2">{review.review}</p>

                      {/* Review Images */}
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {review.images.map((img, index) => (
                            <Image
                              key={index}
                              src={img}
                              alt="Review"
                              className="w-16 h-16 object-cover rounded-md border cursor-pointer"
                              onClick={() =>
                                openImageSlider(review.images, index)
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
            {/* Close Button */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
              <button
                onClick={closeRatingModal}
                className="w-full bg-purple-700 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-scaleIn">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-200 text-center">
                Artist's Origin
              </h3>

              <div className="space-y-3">
                <p className="text-lg font-medium text-indigo-700 text-center">
                  <span className="font-semibold">
                    This artist is from <strong>{bakerCountry}</strong>
                  </span>
                </p>

                <p className="text-gray-600 leading-relaxed text-justify">
                  Understanding a artist's cultural background enhances your
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
                className="w-full bg-[#673AB7] hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
