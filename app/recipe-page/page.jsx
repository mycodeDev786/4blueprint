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
      <div className="bg-white shadow-md p-6 rounded-xl">
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
    </div>
  );
}
