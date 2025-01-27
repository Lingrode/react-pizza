import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterSlice from "./filter/slice.ts";
import cartSlice from "./cart/slice.ts";
import pizzaSlice from "./pizza/slice.ts";
import langSlice from "./lang/slice.ts";

const persistConfigCart = {
  key: "cart",
  storage,
};

const persistConfigLang = {
  key: "lang",
  storage,
};

const persistedCartReducer = persistReducer(persistConfigCart, cartSlice);
const persistedLangReducer = persistReducer(persistConfigLang, langSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizza: pizzaSlice,
    cart: persistedCartReducer,
    lang: persistedLangReducer,
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
