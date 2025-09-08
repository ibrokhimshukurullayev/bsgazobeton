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
        (item) => item.productid === product.productid // ✅ to‘g‘rilandi
      );

      if (exists) {
        // o‘chirish
        state.value = state.value.filter(
          (item) => item.productid !== product.productid // ✅ to‘g‘rilandi
        );
      } else {
        // qo‘shish
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
