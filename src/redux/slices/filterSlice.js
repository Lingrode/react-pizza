import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { changeCategory } = filterSlice.actions;

export default filterSlice.reducer;
