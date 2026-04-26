import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { createCustomSlice } from "@/utils/createCustomSlice";
import { normolizeTempData } from "@/utils/normolizeTempData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type NewCityTempSliceType = {
  data: WeeklyTemp[];
  loading: boolean;
  error: string;
};

const initialState: NewCityTempSliceType = {
  data: [],
  loading: false,
  error: "",
};

// export const fetchData = createAsyncThunk(
//   "fetch/newCityTemp",
//   async (_, { getState }) => {
//     const state = getState() as RootState;
//     const { latitude, longitude } = state.coordinates.coordinates;

//     const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

//     return normolizeTempData(currentWeeklyTemp);
//   },
// );

// export const cityTempSlice = createCustomSlice("newCityTemp", initialState);

export const cityTempSlice = createSlice({
  name: "newCityTemp",
  initialState,
  reducers: {
    setCityTempData(state, action: PayloadAction<WeeklyTemp[]>) {
      state.data = action.payload;
      state.error = "";
    },
    setCityTempError(state) {
      state.error = "Can not load weekly weather for this location";
    },
  },
});

export const { actions } = cityTempSlice;
export default cityTempSlice.reducer;
