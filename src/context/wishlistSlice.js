import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:
    typeof window !== "undefined" && localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleToWishes: (state, action) => {
      const product = action.payload;
      const exists = state.value.find(
        (item) => item.productId === product.productId
      );

      if (exists) {
        // o‘chiramiz
        state.value = state.value.filter(
          (item) => item.productId !== product.productId
        );
      } else {
        // qo‘shamiz
        state.value.push(product);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.value));
      }
    },
  },
});

export const { toggleToWishes } = wishlistSlice.actions;
export default wishlistSlice.reducer;
