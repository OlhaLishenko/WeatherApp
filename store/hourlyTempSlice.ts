import { HourlyTemp } from "@/types/HourlyTemp";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HourlyTempSliceType = {
  data: HourlyTemp[];
  error: string;
};

const initialState: HourlyTempSliceType = {
  data: [],
  error: "",
};

export const hourlyTempSlice = createSlice({
  name: "hourlyTemp",
  initialState,
  reducers: {
    setHourlyTempData(state, action: PayloadAction<HourlyTemp[]>) {
      state.data = action.payload;
      state.error = "";
    },

    setHourlyTempError(state) {
      state.error = "Can not load hourly weather for this location";
    },
  },
});

export const { actions } = hourlyTempSlice;
export default hourlyTempSlice.reducer;
