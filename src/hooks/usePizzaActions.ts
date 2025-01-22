import { useDispatch } from "react-redux";
import { CartItem } from "../redux/cart/types";
import { addItem } from "../redux/cart/slice";

export const usePizzaActions = () => {
  const dispatch = useDispatch();

  const addPizzaToCart = (item: CartItem) => dispatch(addItem(item));

  return { addPizzaToCart };
};
