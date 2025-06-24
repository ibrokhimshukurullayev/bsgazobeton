import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

// Faqat brauzerda `localStorage`dan boshlang'ich qiymatni olish
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("carts");
  if (stored) {
    initialState.value = JSON.parse(stored);
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.value.findIndex(
        (el) => el.productId === action.payload.productId
      );
      if (index < 0) {
        state.value = [...state.value, { ...action.payload, quantity: 1 }];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },
    incCart(state, action) {
      const index = state.value.findIndex(
        (el) => el.productId === action.payload.productId
      );
      state.value = state.value.map((product, inx) => {
        if (index === inx) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },
    decCart(state, action) {
      const index = state.value.findIndex(
        (el) => el.productId === action.payload.productId
      );
      state.value = state.value.map((product, inx) =>
        index === inx ? { ...product, quantity: product.quantity - 1 } : product
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },
    removeFromCart(state, action) {
      state.value = state.value.filter(
        (product) => product.productId !== action.payload.productId
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },
    clearCart(state) {
      state.value = [];

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },
  },
});

export const { addToCart, clearCart, decCart, incCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
