import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          ingredients: action.payload.ingredients,
          image: action.payload.image,
          price: action.payload.price,
          bakerId: action.payload.bakerId,
          isPurchased: action.payload.isPurchased,
          artistName: action.payload.artistName,
        });
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
