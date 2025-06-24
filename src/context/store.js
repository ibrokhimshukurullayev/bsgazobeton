import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice from './wishlistSlice'
import cartSlice from './cartSlice'
import { api } from "./api";

export const store = configureStore({
    reducer: {
        wishlist: wishlistSlice,
        cart: cartSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})