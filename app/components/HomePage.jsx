import React, { useState, useEffect } from "react";
import RecipePost from "./RecipePost";
import CustomPost from "./CustomPost";
import API_ENDPOINTS from "../utils/api";
import Loading from "./Loading";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customPostContent, setCustomPostContent] = useState(
    "This is a custom post."
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_ENDPOINTS.RECIPE.GETALL);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleReadCustomPost = () => {
    setCustomPostContent("Updated custom post content!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-full mx-0 sm:max-w-3xl sm:mx-auto my-0 sm:my-6 space-y-6">
      {recipes?.map((recipe, index) => (
        <div key={recipe.id}>
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
            bakerCountry={recipe.bakerCountry}
            bakerFlag={recipe.bakerFlag}
          />

          {index + 1 === 5 && (
            <CustomPost
              content={customPostContent}
              onRead={handleReadCustomPost}
            />
          )}
        </div>
      ))}
      <Loading isLoading={loading} />
    </div>
  );
};

export default HomePage;
