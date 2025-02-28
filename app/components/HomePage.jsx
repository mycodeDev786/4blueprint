import React, { useState } from "react";
import RecipePost from "./RecipePost";
import recipes from "../constants/recipes";
import CustomPost from "./CustomPost";
const HomePage = () => {
  const [leaderboardType, setLeaderboardType] = useState("");
  const [customPostContent, setCustomPostContent] = useState(
    "This is a custom post."
  );

  // Function to update the custom post when the user reads it
  const handleReadCustomPost = () => {
    setCustomPostContent("Updated custom post content!");
  };
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
      {recipes.map((recipe, index) => (
        <div key={recipe.id}>
          {/* Recipe Post */}
          <RecipePost
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
            isPurchased={recipe.isPurchased}
          />

          {/* Insert a custom post after every 5th recipe */}
          {(index + 1) % 5 === 0 && (
            <CustomPost
              content={customPostContent}
              onRead={handleReadCustomPost}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
