import { assets } from "@/assets/assets";

const recipes = [
  {
    id: 1,
    categoryName: "Dessert", // Dessert
    subcategoryName: "Cakes", // Cakes
    date: "Feb 24, 2025",
    bakerId: 1,
    image: assets.Ad1,
    title: "Chocolate Cake",
    description: "A delicious homemade chocolate cake with rich flavors...",
    ingredients: "Flour, Sugar, Cocoa Powder, Eggs, Butter",
    price: 12.99,
    rating: 4.5,
    isVerified: true,
    isPurchased: true,
  },
  {
    id: 2,
    categoryName: "Dessert",
    subcategoryName: "Cakes", // Pies and Tarts
    date: "Feb 23, 2025",
    bakerId: 2,
    image: assets.Ad2,
    title: "Strawberry Cheesecake",
    description: "A creamy cheesecake topped with fresh strawberries...",
    ingredients: "Cream Cheese, Strawberries, Sugar, Eggs, Crust",
    price: 15.99,
    rating: 5,
    isVerified: true,
    isPurchased: true,
  },
  {
    id: 3,
    categoryName: "",
    subcategoryName: "Cakes", // Pastries
    date: "Feb 23, 2025",
    bakerId: 3,
    image: assets.Ad3,
    title: "Blueberry Muffins",
    description:
      "Soft and fluffy blueberry muffins bursting with fresh berries...",
    ingredients: "Flour, Sugar, Blueberries, Milk, Eggs",
    price: 9.99,
    rating: 4.2,
    isVerified: false,
  },
  {
    id: 4,
    categoryName: "Dessert",
    subcategoryName: "Cookies and Biscuits", // Pies and Tarts
    date: "Feb 24, 2025",
    bakerId: 4,
    image: assets.Ad2,
    title: "Apple Pie",
    description: "A classic apple pie with a flaky, buttery crust...",
    ingredients: "Apples, Flour, Sugar, Butter, Cinnamon",
    price: 14.99,
    rating: 4.7,
    isVerified: true,
  },
  {
    id: 5,
    categoryName: "Dessert",
    subcategoryName: "Pies and Tarts",
    date: "Feb 24, 2025",
    bakerId: 4,
    image: assets.Ad2,
    title: "Apple Pie",
    description: "A classic apple pie with a flaky, buttery crust...",
    ingredients: "Apples, Flour, Sugar, Butter, Cinnamon",
    price: 14.99,
    rating: 4.7,
    isVerified: true,
  },
  {
    id: 6,
    categoryName: "Dessert",
    subcategoryName: "Ice Cream and Frozen Desserts",
    date: "Feb 25, 2025",
    bakerId: 5,
    image: assets.Ad3,
    title: "Vanilla Bean Ice Cream",
    description: "Creamy vanilla ice cream with real vanilla bean specks...",
    ingredients: "Milk, Cream, Sugar, Vanilla Beans",
    price: 8.99,
    rating: 4.8,
    isVerified: true,
  },
];

export default recipes;
