import { configureStore } from "@reduxjs/toolkit";
import { coordinatesSlice } from "./coordinatesSlice";
import { hourlyTempSlice } from "./hourlyTempSlice";
import { locationNameSlice } from "./locationNameSlice";
import { searchCitySlice } from "./searchCity";
import { searchCityTempSlice } from "./searchCityTempSlice";
import { weeklyTempSlice } from "./weeklyTempSlice";

export const store = configureStore({
  reducer: {
    coordinates: coordinatesSlice.reducer,
    weeklyTemp: weeklyTempSlice.reducer,
    hourlyTemp: hourlyTempSlice.reducer,
    locationName: locationNameSlice.reducer,
    searchCity: searchCitySlice.reducer,
    searchCityTemp: searchCityTempSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  return state;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
