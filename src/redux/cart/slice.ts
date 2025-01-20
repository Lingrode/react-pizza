import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const cartId = `${action.payload.id}-${action.payload.size}-${action.payload.type}`;
      const findItem = state.items.find(
        (obj) => obj.cartId === action.payload.cartId
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, cartId });
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.cartId === action.payload);

      if (findItem) {
        findItem.count > 1
          ? findItem.count--
          : (state.items = state.items.filter(
              (obj) => obj.id !== action.payload
            ));
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.cartId === action.payload);

      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.count * findItem.price;
      }

      state.items = state.items.filter((obj) => obj.cartId !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
