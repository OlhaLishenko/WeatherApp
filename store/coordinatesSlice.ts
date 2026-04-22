import { findCurrentGeo } from "@/api/findCurrentGeo";
import { Coordinates } from "@/types/Coordinates";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationGeocodedLocation } from "expo-location";

const initialState: Coordinates = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  loader: true,
  error: null,
};

export const loadCoordinates = createAsyncThunk(
  "loadLocation",
  async () => await findCurrentGeo(),
);

export const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCoordinates.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(
      loadCoordinates.fulfilled,
      (state, action: PayloadAction<LocationGeocodedLocation>) => {
        state.coordinates.latitude = action.payload.latitude;
        state.coordinates.longitude = action.payload.longitude;
        state.loader = false;
      },
    );
    builder.addCase(loadCoordinates.rejected, (state) => {
      state.loader = false;
      state.error = "Error";
    });
  },
});

export const { actions } = coordinatesSlice;
export default coordinatesSlice.reducer;
