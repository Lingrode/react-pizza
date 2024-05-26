import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, FetchPizzasArgs } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);
