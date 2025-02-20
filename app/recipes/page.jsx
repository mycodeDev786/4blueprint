"use client";
import { assets } from "@/assets/assets";
import RecipePost from "../components/RecipePost";
import { useState, useEffect } from "react";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  // ✅ Fetching sample recipe data
  useEffect(() => {
    setRecipes([
      {
        id: 1,
        title: "Chocolate Cake",
        description: "A delicious homemade chocolate cake with rich frosting.",
        date: "Feb 19, 2025",
        bakerName: "Emma Baker",
        bakerImage: "",
        image: assets.Ad1,
      },
      {
        id: 2,
        title: "French Croissants",
        description: "Crispy, buttery croissants baked fresh every morning.",
        date: "Feb 18, 2025",
        bakerName: "Liam Chef",
        bakerImage: "",
        image: assets.Ad2,
      },
      {
        id: 3,
        title: "Strawberry Cheesecake",
        description: "Classic cheesecake topped with fresh strawberries.",
        date: "Feb 17, 2025",
        bakerName: "Sophia Sweets",
        bakerImage: "",
        image: assets.Ad3,
      },
    ]);
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-32 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Recipes</h1>

      {/* ✅ Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
              <RecipePost
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                profileImage={recipe.profileImage}
                baker={recipe.baker}
                date={recipe.date}
              />
            ))}
      </div>
    </div>
  );
}
