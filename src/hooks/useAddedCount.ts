import { useSelector } from "react-redux";
import { countCartItemsById } from "../redux/cart/selectors";

export const useAddedCount = (id: string) => {
  return useSelector(countCartItemsById(id));
};
