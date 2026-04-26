import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { coordinatesSlice } from "./coordinatesSlice";
import { hourlyTempSlice } from "./hourlyTempSlice";
import { locationNameSlice } from "./locationNameSlice";
import { searchCitySlice } from "./searchCity";
import { searchCityTempSlice } from "./searchCityTempSlice";
import { weeklyTempSlice } from "./weeklyTempSlice";

// const rootReducer = combineSlices(
//   coordinatesSlice,
//   weeklyTempSlice,
//   hourlyTempSlice,
//   locationNameSlice,
//   searchCitySlice,
//   searchCityTempSlice,
// );

// export const store = configureStore({
//   reducer: rootReducer,
// });

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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 1) Заходжу в арр
// - поточна локація телефона
// - назва міста / країна
// - прогноз на тиждень в поточній локації
// - прогноз по часам в поточній локації
// (Змінні)
// ---- поточний день тижня
// ---- поточний прогноз

// 2) Пошук
// - координати для пошуку (searchCoordinates)
// - назва міста / країна (яку шукаємо)
// - прогноз на тиждень в місті яке шукаємо
