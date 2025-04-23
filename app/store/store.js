import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userSlice from "./userSlice";
import archiveSlice from "./archiveSlice";
import categoriesSlice from "./categoriesSlice";
import authReducer from "./authSlice";
import tempReducer from "./tempSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userSlice,
    category: categoriesSlice,
    archive: archiveSlice,
    auth: authReducer,
    temp: tempReducer,
  },
});
