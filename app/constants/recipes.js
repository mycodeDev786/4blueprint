import { assets } from "@/assets/assets";

const recipes = [
  {
    id: 1,
    date: "Feb 24, 2025",
    bakerId: 1, // John Doe
    image: assets.Ad1,
    title: "Chocolate Cake",
    description:
      "A delicious homemade chocolate cake with rich flavors. Baked with premium cocoa powder and fresh ingredients, it delivers a moist and decadent taste. Perfect for celebrations or simply indulging in a sweet treat.",
    ingredients: "Flour, Sugar, Cocoa Powder, Eggs, Butter",
    price: 12.99,
    rating: 4.5, // ⭐⭐⭐⭐✨
    isVerified: true,
    isPurchased: true,
  },
  {
    id: 2,
    date: "Feb 23, 2025",
    bakerId: 2, // Jane Smith
    image: assets.Ad2,
    title: "Strawberry Cheesecake",
    description:
      "A creamy cheesecake topped with fresh strawberries, offering a delightful blend of sweetness and tang. The smooth texture pairs beautifully with the buttery crust. A favorite for dessert lovers!",
    ingredients: "Cream Cheese, Strawberries, Sugar, Eggs, Crust",
    price: 15.99,
    rating: 5, // ⭐⭐⭐⭐⭐
    isVerified: true,
    isPurchased: true,
  },
  {
    id: 3,
    date: "Feb 23, 2025",
    bakerId: 3, // Liam Johnson
    image: assets.Ad3,
    title: "Blueberry Muffins",
    description:
      "Soft and fluffy blueberry muffins bursting with fresh berries. These muffins have a delicate crumb and a hint of vanilla, making them a perfect breakfast or snack option. Best enjoyed warm!",
    ingredients: "Flour, Sugar, Blueberries, Milk, Eggs",
    price: 9.99,
    rating: 4.2, // ⭐⭐⭐⭐✨
    isVerified: false,
  },
  {
    id: 4,
    date: "Feb 24, 2025",
    bakerId: 4, // Emma Brown
    image: assets.Ad2,
    title: "Apple Pie",
    description:
      "A classic apple pie with a flaky, buttery crust and cinnamon-spiced apples. Each bite offers a comforting balance of tart and sweet flavors. Ideal for family gatherings and festive occasions.",
    ingredients: "Apples, Flour, Sugar, Butter, Cinnamon",
    price: 14.99,
    rating: 4.7, // ⭐⭐⭐⭐⭐
    isVerified: true,
  },
  {
    id: 5,
    date: "Feb 25, 2025",
    bakerId: 5, // Noah Wilson
    image: assets.Ad2,
    title: "French Croissants",
    description:
      "Buttery and flaky French croissants, baked to golden perfection. Each layer is delicately crisp on the outside and soft on the inside. Enjoy them with coffee or your favorite jam.",
    ingredients: "Flour, Butter, Yeast, Sugar, Milk",
    price: 18.99,
    rating: 5, // ⭐⭐⭐⭐⭐
    isVerified: false,
  },
  {
    id: 6,
    date: "Feb 26, 2025",
    bakerId: 6, // Olivia Martinez
    image: assets.Ad3,
    title: "Macarons",
    description:
      "Colorful and delicate French macarons with a creamy filling. Light and airy, they melt in your mouth with each bite. Available in a variety of flavors to satisfy any craving!",
    ingredients: "Almond Flour, Sugar, Egg Whites, Buttercream",
    price: 22.99,
    rating: 4.8, // ⭐⭐⭐⭐⭐
    isVerified: true,
  },
  {
    id: 7,
    date: "Feb 27, 2025",
    bakerId: 7, // Ethan Davis
    image: assets.Ad3,
    title: "Tiramisu",
    description:
      "A classic Italian dessert made with layers of mascarpone and coffee-soaked sponge. Each bite is a perfect blend of rich, creamy, and coffee-infused flavors. The ultimate treat for coffee lovers.",
    ingredients: "Mascarpone, Espresso, Ladyfingers, Cocoa Powder",
    price: 19.99,
    rating: 4.9, // ⭐⭐⭐⭐⭐
    isVerified: false,
  },
  {
    id: 8,
    date: "Feb 28, 2025",
    bakerId: 1, // John Doe
    image: assets.Ad3,
    title: "Red Velvet Cake",
    description:
      "A moist and velvety red velvet cake layered with creamy cream cheese frosting. A perfect balance of sweetness and mild cocoa flavor. Great for birthdays or special occasions!",
    ingredients: "Flour, Sugar, Cocoa Powder, Buttermilk, Cream Cheese",
    price: 16.99,
    rating: 4.6, // ⭐⭐⭐⭐✨
    isVerified: true,
  },
  {
    id: 9,
    date: "Mar 1, 2025",
    bakerId: 2, // Jane Smith
    image: assets.Ad3,
    title: "Banana Bread",
    description:
      "Soft and moist banana bread with a touch of cinnamon. Made with ripe bananas for a naturally sweet flavor. Perfect as a breakfast treat or an afternoon snack.",
    ingredients: "Bananas, Flour, Sugar, Eggs, Butter",
    price: 10.99,
    rating: 4.4, // ⭐⭐⭐⭐✨
    isVerified: true,
  },
  {
    id: 10,
    date: "Mar 2, 2025",
    bakerId: 3, // Liam Johnson
    image: assets.Ad1,
    title: "Lemon Tart",
    description:
      "A tangy and sweet lemon tart with a buttery crust. The citrusy lemon curd filling brings a refreshing zing. A light and zesty dessert for any occasion.",
    ingredients: "Lemon, Sugar, Flour, Butter, Eggs",
    price: 14.49,
    rating: 4.7, // ⭐⭐⭐⭐⭐
    isVerified: false,
  },
  {
    id: 11,
    date: "Mar 3, 2025",
    bakerId: 4, // Emma Brown
    image: assets.Ad1,
    title: "Cinnamon Rolls",
    description:
      "Soft and gooey cinnamon rolls with a delicious glaze. Each roll is packed with cinnamon-sugar goodness and baked to perfection. A wonderful breakfast or dessert choice.",
    ingredients: "Flour, Sugar, Butter, Cinnamon, Yeast",
    price: 13.99,
    rating: 4.5, // ⭐⭐⭐⭐✨
    isVerified: true,
  },
  {
    id: 12,
    date: "Mar 4, 2025",
    bakerId: 5, // Noah Wilson
    image: assets.Ad2,
    title: "Pumpkin Pie",
    description:
      "Creamy and spiced pumpkin pie, perfect for autumn celebrations. The smooth pumpkin filling is infused with warm spices. A seasonal favorite for Thanksgiving and beyond!",
    ingredients: "Pumpkin Puree, Sugar, Flour, Eggs, Cinnamon",
    price: 15.99,
    rating: 4.8, // ⭐⭐⭐⭐⭐
    isVerified: false,
  },
];

export default recipes;
