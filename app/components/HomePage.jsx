import React from 'react'
import RecipePost from './RecipePost';
import { assets } from '@/assets/assets';

const HomePage = () => {
 
 
  
  const bakers = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      followers: 320,
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
      followers: 450,
    },
  ];
  
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
