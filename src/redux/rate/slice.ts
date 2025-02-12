import { createSlice } from "@reduxjs/toolkit";
import { getRate } from "./operations";
import { RateState } from "./types";

const initialState: RateState = {
  rate: 1,
  lastUpdated: null,
};

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRate.fulfilled, (state, action) => {
      console.log(action);
      
      state.rate = action.payload.rates.USD;
      state.lastUpdated = Date.now();
    });
  },
});

export default rateSlice.reducer;
