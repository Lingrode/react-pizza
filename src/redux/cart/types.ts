export interface CartItem {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}
