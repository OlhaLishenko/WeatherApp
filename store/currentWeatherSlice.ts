import { createSlice } from "@reduxjs/toolkit";

export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    set(_, action: PayloadAction<State>) {
      return action.payload;
    },
  },
});

export const { actions } = currentWeatherSlice;
export default currentWeatherSlice.reducer;
