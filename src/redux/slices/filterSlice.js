import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  order: "asc",
  pageCount: 1,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    changeOrder: (state, action) => {
      state.order = action.payload;
    },
    changePage: (state, action) => {
      state.pageCount = action.payload;
    },
    togglePages: (state, action) => {
      const { btn, maxPages } = action.payload;
      console.log(state);

      if (btn === "prev") state.pageCount = Math.max(1, state.pageCount - 1);
      else if (btn === "next")
        state.pageCount = Math.min(maxPages, state.pageCount + 1);
    },
  },
});

export const {
  changeCategory,
  changeSort,
  changeOrder,
  changePage,
  togglePages,
} = filterSlice.actions;

export default filterSlice.reducer;
