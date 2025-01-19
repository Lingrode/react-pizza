import { RootState } from "../store";

export const selectCurrentPage = (state: RootState) => state.filter.pageCount;
export const selectFilter = (state: RootState) => state.filter;
