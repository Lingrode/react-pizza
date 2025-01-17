import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterState {
  categoryId: number;
  order: string;
  pageCount: number;
  searchValue: string;
  sort: Sort;
}

interface Sort {
  sortProperty: string;
  name: string;
}

const initialState: FilterState = {
  categoryId: 0,
  order: "asc",
  pageCount: 1,
  searchValue: "",
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action: PayloadAction<object>) => {
      state.sort = action.payload;
    },
    changeOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    togglePages: (
      state,
      action: PayloadAction<{ btn: string; maxPages: number }>
    ) => {
      const { btn, maxPages } = action.payload;
      console.log(state);

      if (btn === "prev") state.pageCount = Math.max(1, state.pageCount - 1);
      else if (btn === "next")
        state.pageCount = Math.min(maxPages, state.pageCount + 1);
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});

export const selectCurrentPage = (state: RootState) => state.filter.pageCount;
export const selectFilter = (state: RootState) => state.filter;

export const {
  changeCategory,
  changeSort,
  changeOrder,
  changePage,
  togglePages,
  changeSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
