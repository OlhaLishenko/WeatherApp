import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
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

export const fetchNewCityTemp = createAsyncThunk(
  "fetch/newCityTemp",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { latitude, longitude } = state.searchCity.data;

    const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

    return normolizeTempData(currentWeeklyTemp);
  },
);

export const searchCityTempSlice = createCustomSlice(
  "searchCityTemp",
  initialState,
  fetchNewCityTemp,
);

export const { actions } = searchCityTempSlice;
export default searchCityTempSlice.reducer;
