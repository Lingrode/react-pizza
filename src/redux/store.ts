import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterSlice from "./filter/slice.ts";
import cartSlice from "./cart/slice.ts";
import pizzaSlice from "./pizza/slice.ts";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: persistedReducer,
    pizza: pizzaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
