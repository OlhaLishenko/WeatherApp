import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { coordinatesSlice } from "./coordinatesSlice";
import { locationNameSlice } from "./locationNameSlice";
import { weeklyTempSlice } from "./weeklyTempSlice";
import { hourlyTempSlice } from "./hourlyTempSlice";

const rootReducer = combineSlices(
  locationNameSlice,
  coordinatesSlice,
  weeklyTempSlice,
  hourlyTempSlice,
);

export const store = configureStore({
  reducer: rootReducer,
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
