export type TitleLang = {
  en: string;
  ua: string;
};

export interface CartItem {
  id: string;
  imageUrl: string;
  title: TitleLang;
  type: number;
  size: number;
  price: number;
  count: number;
  cartId: string;
}

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}
