"use client";

import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { assets } from "@/assets/assets";
export default function Cookbook() {
  const [user, setUser] = useState({ name: "John Doe" });

  const recipes = [
    {
      id: 1,
      name: "Chocolate Cake",
      image: assets.Ad1,
      ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"],
      purchased: true,
      price: 5,
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      image: assets.Ad2,
      ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
      purchased: false,
      price: 8,
    },
    {
      id: 3,
      name: "Pasta Carbonara",
      image: assets.Ad2,
      ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
      purchased: true,
      price: 8,
    },
    {
      id: 4,
      name: "Pasta Carbonara",
      image: assets.Ad2,
      ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
      purchased: false,
      price: 15,
    },
    {
      id: 5,
      name: "Pasta Carbonara",
      image: assets.Ad2,
      ingredients: ["Pasta", "Eggs", "Cheese", "Bacon"],
      purchased: false,
      price: 28,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Name */}
      <h1 className="text-2xl font-bold mb-4">{user.name}'s Cookbook</h1>

      {/* Recipe List */}
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
