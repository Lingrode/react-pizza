import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface PizzaItem {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  count: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaState {
  items: PizzaItem[];
  status: Status;
}

interface Sort {
  sortProperty: string;
  name: string;
}

interface Params {
  pageCount: number;
  category: string;
  sort: Sort;
  order: string;
  search: string;
}

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

const initialState: PizzaState = {
  items: [],
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
          state.status = Status.SUCCESS;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
