import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
  order: "asc",
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
  },
});

export const { changeCategory, changeSort, changeOrder } = filterSlice.actions;

export default filterSlice.reducer;
