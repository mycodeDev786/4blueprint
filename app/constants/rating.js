import { assets } from "@/assets/assets";

export const ratings = [
  {
    id: 1, // Unique rating ID
    userId: 101, // Who gave the rating
    recipeId: 1, // Which recipe is being rated
    rating: 4.5, // Stars given by user (1-5)
    review: "Amazing cake, loved it!", // Optional review text
    images: [assets.Ad1, assets.Ad2], // List of image URLs
    createdAt: "2025-02-24T12:00:00Z",
  },
  {
    id: 2, // Unique rating ID
    userId: 101, // Who gave the rating
    recipeId: 1, // Which recipe is being rated
    rating: 5, // Stars given by user (1-5)
    review: "Amazing cake, loved it!", // Optional review text
    images: [assets.Ad2, assets.Ad3], // List of image URLs
    createdAt: "2025-02-24T12:00:00Z",
  },
];
