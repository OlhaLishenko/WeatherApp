import { loadWeeklyTemp } from "@/api/loadWeeklyTemp";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normolizeTempData } from "./normolizeTempData";
import { WeeklyTemp } from "@/types/WeeklyTemp";

type State = {
  data: WeeklyTemp[];
  loading: boolean;
  error: string;
};

export const fetchData = createAsyncThunk(
  "fetch/weeklyTemp",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { latitude, longitude } = state.coordinates.coordinates;

    const currentWeeklyTemp = await loadWeeklyTemp(latitude, longitude);

    return normolizeTempData(currentWeeklyTemp);
  },
);

export function createCustomSlice(
  sliceName: string,
  initialState: State,
  asyncThunk = fetchData,
) {
  return createSlice({
    name: `${sliceName}`,
    initialState: initialState,
    reducers: {
      setData(state, action: PayloadAction<WeeklyTemp[]>) {
        state.data = action.payload;
        state.error = "";
      },
      setError(state) {
        state.error = "Can not load data";
      },
    },
    extraReducers(builder) {
      builder.addCase(asyncThunk.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        asyncThunk.fulfilled,
        (state, action: PayloadAction<WeeklyTemp[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = "";
        },
      );
      builder.addCase(asyncThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Can not load weekly weather for this location";
        state.data = [];
      });
    },
  });
}
