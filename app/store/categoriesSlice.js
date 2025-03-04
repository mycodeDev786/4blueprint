import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "", // Stores category name
  subcategories: [], // Stores subcategories of selected category
  activeTab: "", // Stores the active subcategory
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload.name;
      state.subcategories = action.payload.subcategories;
      state.activeTab = ""; // Reset active tab when category changes
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setCategory, setActiveTab } = categorySlice.actions;
export default categorySlice.reducer;
