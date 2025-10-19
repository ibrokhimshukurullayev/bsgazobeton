// context/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("ADD_TO_CART CALLED:", action.payload);
      const existing = state.value.find(
        (item) => item.productid === action.payload.productid
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.value.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
      console.log("UPDATED CART:", state.value);
    },
    incCart: (state, action) => {
      const item = state.value.find(
        (i) => i.productid === action.payload.productid
      );
      if (item) item.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.value));
      console.log("INCREASE:", state.value);
    },
    decCart: (state, action) => {
      const item = state.value.find(
        (i) => i.productid === action.payload.productid
      );
      if (item && item.quantity > 1) item.quantity--;
      else
        state.value = state.value.filter(
          (i) => i.productid !== action.payload.productid
        );
      localStorage.setItem("cart", JSON.stringify(state.value));
      console.log("DECREASE:", state.value);
    },
    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (i) => i.productid !== action.payload.productid
      );
      localStorage.setItem("cart", JSON.stringify(state.value));
      console.log("REMOVE:", state.value);
    },
    clearCart: (state) => {
      state.value = [];
      localStorage.removeItem("cart");
      console.log("CLEAR CART");
    },
  },
});

export const { addToCart, incCart, decCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
