import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice.ts";
import pizzaSlice from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: { filter: filterSlice, cart: cartSlice, pizza: pizzaSlice },
});
