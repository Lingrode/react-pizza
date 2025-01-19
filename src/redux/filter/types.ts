export interface FilterState {
  categoryId: number;
  order: string;
  pageCount: number;
  searchValue: string;
  sort: SortItem;
}

export interface SortItem {
  sortProperty: "rating" | "price" | "title";
  name: string;
}
