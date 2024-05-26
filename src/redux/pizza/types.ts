export type FetchPizzasArgs = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
