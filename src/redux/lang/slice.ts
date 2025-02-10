import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
