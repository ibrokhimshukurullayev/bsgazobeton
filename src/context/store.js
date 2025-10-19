import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./wishlistSlice";
import cartSlice from "./cartSlice";
import authReducer from "./authSlice";
import { api } from "./api";

function loadFromLocalStorage() {
  if (typeof window === "undefined") return undefined;
  try {
    const serialized = localStorage.getItem("carts");
    if (!serialized) return undefined;
    return { cart: { value: JSON.parse(serialized) } };
  } catch (e) {
    console.warn("Load error:", e);
    return undefined;
  }
}

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: cartSlice,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// 🔹 Har bir o‘zgarishda localStorage’ni yangilaydi
if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      localStorage.setItem("carts", JSON.stringify(state.cart.value));
    } catch (e) {
      console.warn("Save error:", e);
    }
  });
}
