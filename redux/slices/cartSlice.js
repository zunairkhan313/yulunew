"use client";
import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
