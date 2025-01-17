import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice.ts";
import cartSlice from "./slices/cartSlice.ts";
import pizzaSlice from "./slices/pizzaSlice.ts";

export const store = configureStore({
  reducer: { filter: filterSlice, cart: cartSlice, pizza: pizzaSlice },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
