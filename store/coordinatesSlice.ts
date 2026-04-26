import { findCurrentGeo } from "@/api/findCurrentGeo";
import { Coordinates } from "@/types/Coordinates";
import { State } from "@/types/State";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationGeocodedLocation } from "expo-location";

const initialState: State<Coordinates> = {
  data: {
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
        state.data.latitude = action.payload.latitude;
        state.data.longitude = action.payload.longitude;
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
