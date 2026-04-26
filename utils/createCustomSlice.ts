import {
  AsyncThunk,
  AsyncThunkConfig,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { WeeklyTemp } from "@/types/WeeklyTemp";
import { State } from "@/types/State";

export function createCustomSlice(
  sliceName: string,
  initialState: State<WeeklyTemp[]>,
  asyncThunk: AsyncThunk<WeeklyTemp[], void, AsyncThunkConfig>,
) {
  return createSlice({
    name: `${sliceName}`,
    initialState: initialState,
    reducers: {
      setData(state, action: PayloadAction<WeeklyTemp[]>) {
        state.data = action.payload;
        state.error = null;
      },
      setError(state) {
        state.error = "Can not load data";
      },
    },
    extraReducers(builder) {
      builder.addCase(asyncThunk.pending, (state) => {
        state.loader = true;
      });
      builder.addCase(
        asyncThunk.fulfilled,
        (state, action: PayloadAction<WeeklyTemp[]>) => {
          state.data = action.payload;
          state.loader = false;
          state.error = null;
        },
      );
      builder.addCase(asyncThunk.rejected, (state) => {
        state.loader = false;
        state.error = "Can not load weekly weather for this location";
        state.data = [];
      });
    },
  });
}
