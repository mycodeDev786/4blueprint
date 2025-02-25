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
    <div
      className="container w-full mx-0 sm:max-w-3xl sm:mx-auto my-0 sm:my-6 space-y-6
"
    >
      {recipes.map((recipe) => (
        <RecipePost
          key={recipe.id}
          id={recipe.id}
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
