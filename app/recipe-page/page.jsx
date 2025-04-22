"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";

export default function RecipePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
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
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-600 text-center">Error: {error}</div>;
  if (!recipe) return <div className="p-6 text-center">No recipe found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Baker Info */}
      <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-xl">
        <img
          src={`${API_ENDPOINTS.STORAGE_URL}${recipe.profileImage}`}
          alt={recipe.bakerName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{recipe.bakerName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <img src={recipe.bakerFlag} alt="Flag" className="w-5 h-5" />
            <span className="text-gray-500 text-sm">{recipe.bakerCountry}</span>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Followers:</span>{" "}
              {recipe.followersCount}
            </p>
            <p>
              <span className="font-medium">Top 10 Sales:</span>{" "}
              {recipe.isTop10Sales ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Top 10 Followers:</span>{" "}
              {recipe.isTop10Followers ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="w-full h-[400px] overflow-hidden rounded-2xl shadow-md">
        <img
          src={`${API_ENDPOINTS.STORAGE_URL}${recipe.image}`}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Details */}
      <div className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-medium">Description:</span>{" "}
            {recipe.description}
          </p>
          <p>
            <span className="font-medium">Ingredients:</span>{" "}
            {recipe.ingredients}
          </p>
          <p>
            <span className="font-medium">Type:</span>{" "}
            {recipe.combinedIngredients}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${recipe.price}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {recipe.category_name}
          </p>
          <p>
            <span className="font-medium">Subcategory:</span>{" "}
            {recipe.subcategory_name}
          </p>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {new Date(recipe.date).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Rating:</span> {recipe.rating} (
            {recipe.ratings_count} ratings)
          </p>
          <p>
            <span className="font-medium">Baker Rating:</span>{" "}
            {recipe.bakerRating}
          </p>
          <p>
            <span className="font-medium">Baker Score:</span>{" "}
            {recipe.bakerScore}
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white shadow-md p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>

        {/* Add Review */}
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
