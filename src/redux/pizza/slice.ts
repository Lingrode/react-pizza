import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FullPizzaItem, PizzaItem, PizzaState, Status } from "../pizza/types";
import { fetchFullPizza, fetchPizzas } from "./operations";

const initialState: PizzaState = {
  items: [],
  pizza: null,
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<PizzaItem[]>) => {
          state.items = action.payload;
          state.pizza = null;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      })
      .addCase(fetchFullPizza.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchFullPizza.fulfilled,
        (state, action: PayloadAction<FullPizzaItem>) => {
          state.pizza = action.payload;
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchFullPizza.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizza = null;
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
