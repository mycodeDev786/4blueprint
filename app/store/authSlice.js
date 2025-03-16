import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isHydrated: false, // Track hydration
};

// Function to safely get stored data from localStorage
const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const token = localStorage.getItem("token") || null;
    return { user, token };
  }
  return { user: null, token: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
    hydrateAuth: (state) => {
      const { user, token } = loadStateFromLocalStorage();
      state.user = user;
      state.token = token;
      state.isHydrated = true;
    },
  },
});

export const { setUser, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
