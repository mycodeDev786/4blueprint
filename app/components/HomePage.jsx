import React from 'react'
import RecipePost from './RecipePost';

import recipes from '../constants/recipes';
const HomePage = () => {
 
  
  return (
    <div className="max-w-3xl mx-auto my-6 space-y-6">
   
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
  );
}

export default HomePage
