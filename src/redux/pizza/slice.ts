import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  FullPizzaItem,
  Params,
  PizzaItem,
  PizzaState,
  Status,
} from "../pizza/types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], Params>(
  "pizza/fetchPizzas",
  async (params) => {
    const { pageCount, category, sort, order, search } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items?limit=8&page=${pageCount}&${category}&sortBy=${sort.sortProperty}&order=${order}&${search}`
    );

    return data;
  }
);

export const fetchFullPizza = createAsyncThunk<FullPizzaItem, string>(
  "pizza/fetchFullPizza",
  async (id) => {
    const { data } = await axios.get<FullPizzaItem>(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items/${id}`
    );

    console.log(data);

    return data;
  }
);

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
