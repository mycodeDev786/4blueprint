"use client";

import { Header } from "@/app/components/CategoryHeaderComponent";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/categoriesSlice";
import { useRouter } from "next/navigation";

import AllRecipePageCard from "@/app/components/AllRecipePageCard";
import API_ENDPOINTS from "@/app/utils/api";
import Loading from "@/app/components/Loading";

export default function CookiesAndBiscuits() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Get category, subcategories, and active tab from Redux
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const subcategories = useSelector((state) => state.category.subcategories);
  const activeTab = useSelector((state) => state.category.activeTab);

  useEffect(() => {
    if (subcategories.length > 0) {
      // Set first subcategory as default active tab if none is selected
      dispatch(setActiveTab(activeTab || subcategories[0]?.name || ""));
    }
  }, [subcategories, activeTab, dispatch]);

  // ✅ Updated Filtering Logic

  const filteredRecipes = recipes.filter((recipe) => {
    const isSameCategory = recipe.category_name === selectedCategory;
    const isAllTab = activeTab === "All";
    const isSameSubcategory = recipe.subcategory_name === activeTab;

    return isSameCategory && (isAllTab || isSameSubcategory);
  });

  return (
    <div className="px-0 mt-5 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      <Loading isLoading={loading} />
      <div className="bg-gray-50 flex justify-center">
        <Header
          category={selectedCategory}
          subCategory={activeTab}
          tabs={subcategories.map((sub) => sub.name)} // No need to add "All" explicitly
          onTabChange={(tab) => {
            const formattedCategory = selectedCategory
              .replace(/\s+/g, "-")
              .toLowerCase();
            const formattedSubcategory = tab.replace(/\s+/g, "-").toLowerCase();

            // Navigate to category page

            router.push(
              `/the-menu/${formattedCategory}/${formattedSubcategory}`
            );
            dispatch(setActiveTab(tab));
          }}
          onCountryChange={(country) =>
            console.log("Selected country:", country)
          }
          onSortChange={(sort) => console.log("Selected sort:", sort)}
          onFilterClick={() => console.log("Filter button clicked")}
        />
      </div>
      {/* ✅ Grid Layout */}
      <div className="max-w-lg md:max-w-full  mx-0 md:mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {filteredRecipes.map((recipe) => (
          <AllRecipePageCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            ingredients={recipe.ingredients}
            image={recipe.image}
            bakerId={recipe.bakerId}
            rating={recipe.rating}
            followersCount={recipe.followersCount}
            price={recipe.price}
            isPurchased={recipe.isPurchased}
            bakerCountry={recipe.bakerCountry}
            bakerFlag={recipe.bakerFlag}
            bakerName={recipe.bakerName}
          />
        ))}
      </div>
    </div>
  );
}
