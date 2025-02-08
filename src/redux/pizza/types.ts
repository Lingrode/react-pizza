import { IngredientsLang } from "../../components";

export type TitleLang = {
  en: string;
  ua: string;
};

export interface PizzaItem {
  id: string;
  imageUrl: string;
  title: TitleLang;
  types: number[];
  sizes: number[];
  prices: number[];
  count: number;
}

export interface FullPizzaItem {
  imageUrl: string;
  title: TitleLang;
  prices: number[];
  ingredients: IngredientsLang;
  types: number[];
  sizes: number[];
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaState {
  items: PizzaItem[];
  pizza: FullPizzaItem | null;
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
