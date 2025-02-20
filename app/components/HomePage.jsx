import React from 'react'
import RecipePost from './RecipePost';
import { assets } from '@/assets/assets';

const HomePage = () => {
  const recipes = [
    {
      id: 1,
      title: "Delicious Chocolate Cake",
      description: "Rich cocoa flavor with a moist texture...",
      image: assets.Ad1,
      profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
      baker: "Jane Doe",
      date: "February 19, 2025 - 10:30 AM",
    },
    {
      id: 2,
      title: "Homemade Croissants",
      description: "Flaky, buttery croissants with a golden crust...",
      image: assets.Ad2,
      profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
      baker: "John Smith",
      date: "February 18, 2025 - 8:00 AM",
    },
    {
      id: 3,
      title: "Strawberry Cheesecake",
      description: "Creamy cheesecake with fresh strawberries...",
      image: assets.Ad3,
      profileImage: "https://randomuser.me/api/portraits/women/25.jpg",
      baker: "Alice Brown",
      date: "February 17, 2025 - 2:45 PM",
    },
  ];
  return (
    <div className="max-w-3xl mx-auto my-6 space-y-6">
    <h1 className="text-2xl font-bold text-center">All Recipes</h1>
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
  );
}

export default HomePage
