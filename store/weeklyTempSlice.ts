import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
import { Coordinates } from "@/types/Coordinates";
import { State } from "@/types/State";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { createCustomSlice } from "@/utils/createCustomSlice";
import { normolizeTempData } from "@/utils/normolizeTempData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: State<WeeklyTemp[]> = {
  data: [],
  loader: false,
  error: null,
};

export const fetchWeeklyData = createAsyncThunk(
  "fetch/weeklyTemp",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { latitude, longitude } = state.coordinates.data as Coordinates;
    const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

    return normolizeTempData(currentWeeklyTemp, "weekly") as WeeklyTemp[];
  },
);

export const weeklyTempSlice = createCustomSlice(
  "weeklyTemp",
  initialState,
  fetchWeeklyData,
);
export const { actions } = weeklyTempSlice;
export default weeklyTempSlice.reducer;
