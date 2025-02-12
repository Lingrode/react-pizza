import { RootState } from "../store";

export const selectRate = (state: RootState) => state.rate.rate;
export const selectLastUpdated = (state: RootState) => state.rate.lastUpdated;
