import { WeeklyTemp } from "@/types/WeeklyTemp";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WeeklyTempSliceType = {
  data: WeeklyTemp[];
  error: string;
};

const initialState: WeeklyTempSliceType = {
  data: [],
  error: "",
};

export const weeklyTempSlice = createSlice({
  name: "weeklyTemp",
  initialState,
  reducers: {
    setWeeklyTempData(state, action: PayloadAction<WeeklyTemp[]>) {
      state.data = action.payload;
      state.error = "";
    },
    setWeeklyTempError(state) {
      state.error = "Can not load weekly weather for this location";
    },
  },
});

export const { actions } = weeklyTempSlice;
export default weeklyTempSlice.reducer;
