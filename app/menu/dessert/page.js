"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dessertCategories from "@/app/constants/dessertCategories";

export default function CategoryPage() {
  const params = useParams();
  console.log("Params in [category]:", params); // Debugging

  if (!params || !params.category) {
    console.error("Category is undefined");
    return <div>Loading...</div>;
  }

  const { category } = params;
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const normalizedCategory = category.replace(/-/g, " ").toLowerCase();
    const selectedCategory = dessertCategories.find(
      (cat) => cat.name.toLowerCase() === normalizedCategory
    );

    if (selectedCategory) {
      setTabs(selectedCategory.subcategories.map((sub) => sub.name));
    } else {
      setTabs([]);
    }
  }, [category]);

  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Available Subcategories:</h2>
      <ul>
        {tabs.map((tab) => (
          <li key={tab}>{tab}</li>
        ))}
      </ul>
    </div>
  );
}
