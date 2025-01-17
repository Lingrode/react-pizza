import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface PizzaItem {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
}

interface PizzaState {
  items: PizzaItem[];
  status: string;
}

interface Sort {
  sortProperty: string;
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
    const { data } = await axios.get(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items?limit=8&page=${pageCount}&${category}&sortBy=${sort.sortProperty}&order=${order}&${search}`
    );

    return data;
  }
);

const initialState: PizzaState = {
  items: [],
  status: "loading",
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
        state.status = "loading";
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<PizzaItem[]>) => {
          state.items = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
