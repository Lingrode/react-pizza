import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterSlice from "./filter/slice.ts";
import cartSlice from "./cart/slice.ts";
import pizzaSlice from "./pizza/slice.ts";
import langSlice from "./lang/slice.ts";
import themeSlice from "./theme/slice.ts";

const persistConfig = {
  key: "pizza",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice);
const persistedLangReducer = persistReducer(persistConfig, langSlice);
const persistedThemeReducer = persistReducer(persistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pizza: pizzaSlice,
    cart: persistedCartReducer,
    lang: persistedLangReducer,
    theme: persistedThemeReducer,
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
