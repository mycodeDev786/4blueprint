"use client";
import { assets } from "@/assets/assets";
import RecipePost from "../components/RecipePost";
import { useState, useEffect } from "react";
import recipes from "../constants/recipes";
export default function AllRecipes() {
 

  // ✅ Fetching sample recipe data
  useEffect(() => {
    
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-32 py-8">
     <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Recipes</h1>


      {/* ✅ Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
