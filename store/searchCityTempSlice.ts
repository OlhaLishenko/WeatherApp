import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { createCustomSlice } from "@/utils/createCustomSlice";
import { normolizeTempData } from "@/utils/normolizeTempData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchNewCityTemp = createAsyncThunk(
  "fetch/newCityTemp",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { latitude, longitude } = state.searchCity.data;

    const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

    return normolizeTempData(currentWeeklyTemp, "weekly") as WeeklyTemp[];
  },
);

export const searchCityTempSlice = createCustomSlice(
  "searchCityTemp",
  fetchNewCityTemp,
);

export const { actions } = searchCityTempSlice;
export default searchCityTempSlice.reducer;
