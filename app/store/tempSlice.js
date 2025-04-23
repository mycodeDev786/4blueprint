import { createSlice } from "@reduxjs/toolkit";

const tempSlice = createSlice({
  name: "temp",
  initialState: {
    value: null, // You can replace null with any default value
  },
  reducers: {
    setTemp: (state, action) => {
      state.value = action.payload; // Set the temporary value
    },
    clearTemp: (state) => {
      state.value = null; // Clear the temporary value
    },
  },
});

export const { setTemp, clearTemp } = tempSlice.actions;

export default tempSlice.reducer;
