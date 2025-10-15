import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

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
        (el) => el.productid === action.payload.productid
      );

      if (index < 0) {
        state.value.push({ ...action.payload, quantity: 1 });
      } else {
        state.value[index].quantity += 1;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },

    incCart(state, action) {
      const index = state.value.findIndex(
        (el) => el.productid === action.payload.productid
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
        (el) => el.productid === action.payload.productid
      );

      if (index >= 0) {
        const product = state.value[index];

        if (product.quantity > 1) {
          // faqat kamaytirish
          state.value[index] = { ...product, quantity: product.quantity - 1 };
        } else {
          // 1 tadan kam bo‘lsa — o‘chir
          state.value.splice(index, 1);
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(state.value));
      }
    },

    removeFromCart(state, action) {
      state.value = state.value.filter(
        (product) => product.productid !== action.payload.productid
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
