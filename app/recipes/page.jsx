"use client";
import { assets } from "@/assets/assets";
import RecipePost from "../components/RecipePost";
import { useState, useEffect } from "react";

export default function AllRecipes() {
 
 const recipes = [
    {
      id: 1,
      date: "Feb 21, 2025",
      bakerId: 1, // Linking baker dynamically
      image: assets.Ad1,
      title: "Chocolate Cake",
      description: "A delicious homemade chocolate cake with rich flavors...",
      ingredients: ["Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter"],
      price: 12.99,
      rating: 4.5, // ⭐⭐⭐⭐✨
    },
    {
      id: 2,
      date: "Feb 22, 2025",
      bakerId: 2,
      image: assets.Ad2,
      title: "Strawberry Cheesecake",
      description: "A creamy cheesecake topped with fresh strawberries...",
      ingredients: ["Cream Cheese", "Strawberries", "Sugar", "Eggs", "Crust"],
      price: 15.99,
      rating: 5, // ⭐⭐⭐⭐⭐
    },
  ];
  // ✅ Fetching sample recipe data
  useEffect(() => {
    
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
                   bakerId={recipe.bakerId}
                   bakerName={recipe.bakerName} // ✅ Now passing dynamically
                   profileImage={recipe.profileImage} // ✅ Now passing dynamically
                   date={recipe.date}
                   rating={recipe.rating}
                   followersCount={recipe.followersCount} // ✅ Dynamic followers
                   ingredients={recipe.ingredients}
                   price={recipe.price}
                 />
               ))}
      </div>
    </div>
  );
}
