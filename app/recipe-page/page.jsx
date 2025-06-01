"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import Loading from "../components/Loading";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import React components from Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function RecipePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isPurchased, setIsPurchased] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);
  const [dummyReviews, setDummyReviews] = useState([
    {
      name: "Sarah A.",
      comment: "Delicious and easy to follow!",
      rating: 5,
    },
    {
      name: "Ali M.",
      comment: "Tastes amazing, will bake again!",
      rating: 4,
    },
  ]);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const data = await apiRequest(
            API_ENDPOINTS.RECIPE.GET_RECIPE_BY_ID(id)
          );
          setRecipe(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id]);
  const handleBakerClick = () => {
    router.push(`/artist-page?id=${recipe.bakerId}`);
  };

  const handleAddReview = () => {
    if (!newReview.trim() || newRating === 0) return;
    setDummyReviews([
      { name: "You", comment: newReview, rating: newRating },
      ...dummyReviews,
    ]);
    setNewReview("");
    setNewRating(0);
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 inline-block ${
          i < count ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.785.57-1.84-.197-1.54-1.118l1.287-3.951a1 1 0 00-.364-1.118L2.075 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.951z" />
      </svg>
    ));
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        <Loading isLoading={loading} />
      </div>
    );

  if (!recipe) return <div className="p-6 text-center">No recipe found.</div>;

  return (
    <div className="max-w-4xl w-full mx-auto px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24 space-y-6">
      {/* Baker Info */}

      {/* Recipe Image */}
      <div className="w-full mt-5  overflow-hidden rounded-2xl shadow-md relative">
        {recipe.allImages && recipe.allImages.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-64 rounded-lg overflow-hidden"
          >
            {recipe.allImages.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${API_ENDPOINTS.STORAGE_URL}${imgSrc}`}
                  alt={`${recipe.title} image ${index + 1}`}
                  className="w-full h-64 object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No images available</p>
        )}

        {/* Rating Display */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-3 py-2 rounded-lg shadow flex items-center space-x-2 text-sm font-medium">
          {recipe.rating > 0 ? (
            <>
              {/* Stars */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      recipe.rating >= star
                        ? "text-yellow-400"
                        : recipe.rating >= star - 0.5
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.785.57-1.84-.197-1.54-1.118l1.287-3.951a1 1 0 00-.364-1.118L2.075 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.951z" />
                  </svg>
                ))}
              </div>
              <span>{recipe.rating} / 5</span>
            </>
          ) : (
            <span className="text-gray-600 italic">No rating available</span>
          )}
        </div>
      </div>
      {/* Recipe Details */}
      <div className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-medium">Description:</span>{" "}
            {recipe.description}
          </p>
          <div>
            <span className="font-medium">Ingredients:</span>
            <ul className="list-disc list-inside mt-1">
              {recipe.ingredients.split(",").map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>

          <p>
            <span className="font-medium"> Recipe Price:</span> ${recipe.price}
          </p>

          <p>
            <span className="font-medium">Created:</span>{" "}
            {new Date(recipe.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Dummy Video */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Watch Tutorial</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-72 rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Recipe Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {/* Add Review */}
        {recipe.type === "hidden" ||
          (isPurchased && (
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`w-6 h-6 cursor-pointer ${
                      (hoverRating || newRating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.951c.3.921-.755 1.688-1.54 1.118l-3.36-2.444a1 1 0 00-1.175 0l-3.36 2.444c-.785.57-1.84-.197-1.54-1.118l1.287-3.951a1 1 0 00-.364-1.118L2.075 9.378c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.951z" />
                  </svg>
                ))}
              </div>

              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full border rounded-md p-2 text-sm"
                rows={3}
              ></textarea>
              <button
                onClick={handleAddReview}
                className="self-end bg-[#FFB703] text-white px-4 py-2 rounded-md hover:bg-[#FFA500]"
              >
                Submit Review
              </button>
            </div>
          ))}

        {/* Show Reviews */}
        <div className="space-y-2">
          {dummyReviews.map((review, index) => (
            <div
              key={index}
              className="border p-3 rounded-md bg-gray-50 text-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.name}</p>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
