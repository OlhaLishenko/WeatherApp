import { WeeklyTemp } from "@/types/WeeklyTemp";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
// import { weekDayNames } from "@/constants/weekDayNames";
// import { normolizeTempData } from "@/utils/normolizeTempData";
import { createCustomSlice } from "@/utils/createCustomSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
import { normolizeTempData } from "@/utils/normolizeTempData";

export type WeeklyTempSliceType = {
  data: WeeklyTemp[];
  loading: boolean;
  error: string;
};

const initialState: WeeklyTempSliceType = {
  data: [],
  loading: false,
  error: "",
};

export const weeklyTempSlice = createCustomSlice("weeklyTemp", initialState);

// export const fetchData = createAsyncThunk(
//   "fetch/weeklyTemp",
//   async (_, { getState }) => {
//     const state = getState() as RootState;
//     const { latitude, longitude } = state.coordinates.coordinates;

//     const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

//     return normolizeTempData(currentWeeklyTemp);
//   },
// );

// export const fetchWeeklyTemp = createAsyncThunk(
//   "fetch/weeklyTemp",
//   async (_, { getState }) => {
//     const state = getState() as RootState;
//     const { latitude, longitude } = state.coordinates.coordinates;

//     const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

//     return normolizeTempData(currentWeeklyTemp);
//   },
// );

// export const weeklyTempSlice = createSlice({
//   name: "weeklyTemp",
//   initialState,
//   reducers: {
//     setWeeklyTempData(state, action: PayloadAction<WeeklyTemp[]>) {
//       state.data = action.payload;
//       state.error = "";
//     },
//     setWeeklyTempError(state) {
//       state.error = "Can not load weekly weather for this location";
//     },
//   },

//   extraReducers(builder) {
//     builder.addCase(fetchWeeklyTemp.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(
//       fetchWeeklyTemp.fulfilled,
//       (state, action: PayloadAction<WeeklyTemp[]>) => {
//         state.data = action.payload;
//         state.loading = false;
//         state.error = "";
//       },
//     );
//     builder.addCase(fetchWeeklyTemp.rejected, (state) => {
//       state.loading = false;
//       state.error = 'Can not load weekly weather for this location"';
//       state.data = [];
//     });
//   },
// });
export const { setData, setError } = weeklyTempSlice.actions;
export const { actions } = weeklyTempSlice;
export default weeklyTempSlice.reducer;
