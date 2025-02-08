import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FullPizzaItem, PizzaItem } from "./types";
import { Params } from "./types";

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

    return data;
  }
);
