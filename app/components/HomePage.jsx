import React, { useState } from "react";
import RecipePost from "./RecipePost";
import recipes from "../constants/recipes";

const HomePage = () => {
  const [leaderboardType, setLeaderboardType] = useState("");

  const handleLeaderboardClick = (type) => {
    setLeaderboardType(type);
    // Placeholder for future leaderboard logic
    console.log(`Displaying ${type} leaderboard`);
  };

  return (
    <div className="max-w-3xl mx-auto my-6 space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="bg-[#673AB7] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => handleLeaderboardClick("Top 10 Sales (Monthly)")}
        >
          Top 10 Sales (Monthly)
        </button>
        <button
          className="bg-[#673AB7] text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() =>
            handleLeaderboardClick("Top 10 New Followers (Monthly)")
          }
        >
          Top 10 New Followers (Monthly)
        </button>
      </div>

      {recipes.map((recipe) => (
        <RecipePost
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          image={recipe.image}
          bakerId={recipe.bakerId}
          bakerName={recipe.bakerName}
          profileImage={recipe.profileImage}
          date={recipe.date}
          rating={recipe.rating}
          followersCount={recipe.followersCount}
          ingredients={recipe.ingredients}
          price={recipe.price}
        />
      ))}
    </div>
  );
};

export default HomePage;
