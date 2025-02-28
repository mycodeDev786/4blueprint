import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores user data
  isAuthenticated: false, // Tracks login status
  loading: false, // Manages loading state
  error: null, // Stores error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
