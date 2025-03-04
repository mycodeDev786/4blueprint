"use client";

import { Header } from "@/app/components/CategoryHeaderComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../../store/categoriesSlice";
import { useRouter } from "next/navigation";

export default function IceCreamAndDesserts() {
  const dispatch = useDispatch();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <Header
        category={selectedCategory}
        subCategory={activeTab}
        tabs={subcategories.map((sub) => sub.name)}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        onCountryChange={(country) => console.log("Selected country:", country)}
        onSortChange={(sort) => console.log("Selected sort:", sort)}
        onFilterClick={() => console.log("Filter button clicked")}
      />
    </div>
  );
}
