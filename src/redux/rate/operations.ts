import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RateType } from "./types";

const instance = axios.create({
  baseURL: "https://api.apilayer.com/exchangerates_data",
  headers: { apiKey: "G90LZ6CFAckMkxh4NT0r9JtcRLjaFxMP" },
});

export const getRate = createAsyncThunk<RateType, { rejectValue: string }>(
  "rate/getRate",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get<RateType>(
        "/latest?symbols=USD&base=UAH"
      );

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
