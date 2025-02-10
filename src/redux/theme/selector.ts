import { RootState } from "../store";

export const selectIsDark = (state: RootState) => state.theme.isDark;
