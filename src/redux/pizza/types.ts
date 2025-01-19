export interface PizzaItem {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  count: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaState {
  items: PizzaItem[];
  status: Status;
}

interface Sort {
  sortProperty: string;
  name: string;
}

export interface Params {
  pageCount: number;
  category: string;
  sort: Sort;
  order: string;
  search: string;
}
