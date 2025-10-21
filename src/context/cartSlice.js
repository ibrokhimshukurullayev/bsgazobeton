// context/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  if (typeof window === "undefined") return []; // serverda bo'lsa bo'sh array
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed parse cart from localStorage", e);
    return [];
  }
};

const initialState = {
  value: [], // bo'sh bilan boshlaymiz — keyin clientda init action bilan to'ldiramiz
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Client-da chaqiladigan init action
    initFromLocalStorage: (state) => {
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("cart");
          state.value = raw ? JSON.parse(raw) : [];
          console.log("CART INIT FROM localStorage:", state.value);
        } catch (e) {
          console.error("cart init error:", e);
          state.value = [];
        }
      }
    },

    addToCart: (state, action) => {
      console.log("ADD_TO_CART CALLED:", action.payload);
      const existing = state.value.find(
        (item) => item.productid === action.payload.productid
      );
      if (existing) {
        existing.quantity =
          Number(existing.quantity || 0) + Number(action.payload.quantity || 1);
      } else {
        // ensure quantity exists
        const payload = {
          ...action.payload,
          quantity: Number(action.payload.quantity || 1),
        };
        state.value.push(payload);
      }
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cart", JSON.stringify(state.value));
        } catch (e) {
          console.error("Failed to save cart:", e);
        }
      }
      console.log("UPDATED CART:", state.value);
    },

    incCart: (state, action) => {
      const item = state.value.find(
        (i) => i.productid === action.payload.productid
      );
      if (item) item.quantity = Number(item.quantity || 0) + 1;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cart", JSON.stringify(state.value));
        } catch (e) {
          console.error("Failed to save cart:", e);
        }
      }
      console.log("INCREASE:", state.value);
    },

    decCart: (state, action) => {
      const item = state.value.find(
        (i) => i.productid === action.payload.productid
      );
      if (item) {
        if (Number(item.quantity || 0) > 1) {
          item.quantity = Number(item.quantity) - 1;
        } else {
          state.value = state.value.filter(
            (i) => i.productid !== action.payload.productid
          );
        }
      }
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cart", JSON.stringify(state.value));
        } catch (e) {
          console.error("Failed to save cart:", e);
        }
      }
      console.log("DECREASE:", state.value);
    },

    removeFromCart: (state, action) => {
      state.value = state.value.filter(
        (i) => i.productid !== action.payload.productid
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("cart", JSON.stringify(state.value));
        } catch (e) {
          console.error("Failed to save cart:", e);
        }
      }
      console.log("REMOVE:", state.value);
    },

    clearCart: (state) => {
      state.value = [];
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("cart");
        } catch (e) {
          console.error("Failed to clear cart:", e);
        }
      }
      console.log("CLEAR CART");
    },
  },
});

export const {
  addToCart,
  incCart,
  decCart,
  removeFromCart,
  clearCart,
  initFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
