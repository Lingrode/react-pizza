import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import filterSlice from "./filter/slice.ts";
import cartSlice from "./cart/slice.ts";
import pizzaSlice from "./pizza/slice.ts";
import langSlice from "./lang/slice.ts";
import themeSlice from "./theme/slice.ts";
import rateSlice from "./rate/slice.ts";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistLangConfig = {
  key: "lang",
  storage,
};

const persistThemeConfig = {
  key: "theme",
  storage,
};

const persistRateConfig = {
  key: "rate",
  storage,
};

const persistedCartReducer = persistReducer(persistCartConfig, cartSlice);
const persistedLangReducer = persistReducer(persistLangConfig, langSlice);
const persistedThemeReducer = persistReducer(persistThemeConfig, themeSlice);
const persistedRateReducer = persistReducer(persistRateConfig, rateSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizza: pizzaSlice,
    cart: persistedCartReducer,
    lang: persistedLangReducer,
    theme: persistedThemeReducer,
    rate: persistedRateReducer,
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
