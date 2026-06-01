import {
  AsyncThunk,
  AsyncThunkConfig,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { State } from "@/types/State";

export const defaultInitialState = <T>(): State<T[]> => ({
  data: [],
  loader: false,
  error: null,
});

export function createCustomSlice(
  sliceName: string,
  asyncThunk: AsyncThunk<T[], void, AsyncThunkConfig>,
  initialState: State<T[]> = defaultInitialState<T>(),
) {
  return createSlice({
    name: `${sliceName}`,
    initialState: initialState,
    reducers: {
      setData(state, action: PayloadAction<T[]>) {
        state.data = action.payload as State<T[]>["data"];
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
        (state, action: PayloadAction<T[]>) => {
          state.data = action.payload as State<T[]>["data"];
          state.loader = false;
          state.error = null;
        },
      );
      builder.addCase(asyncThunk.rejected, (state) => {
        state.loader = false;
        state.error = "Can not load weekly weather for this location";
        state.data = [] as State<T[]>["data"];
      });
    },
  });
}
