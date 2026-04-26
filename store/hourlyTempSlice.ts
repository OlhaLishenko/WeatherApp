import { HourlyTemp } from "@/types/HourlyTemp";
import { State } from "@/types/State";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: State<HourlyTemp[]> = {
  data: [],
  loader: false,
  error: null,
};

export const hourlyTempSlice = createSlice({
  name: "hourlyTemp",
  initialState,
  reducers: {
    setHourlyTempData(state, action: PayloadAction<HourlyTemp[]>) {
      state.data = action.payload;
      state.error = null;
    },

    setHourlyTempError(state) {
      state.error = "Can not load hourly weather for this location";
    },
  },
});

export const { actions } = hourlyTempSlice;
export default hourlyTempSlice.reducer;
