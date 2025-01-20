import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;
export const countCartItemsById = (id: string) => (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => (item.id === id ? sum + item.count : sum),
    0
  );
