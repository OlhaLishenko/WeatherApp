import { findCityByCoordinates } from "@/api/findCityByCoordinates";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
type LocationName = {
  city: string | null;
  country: string | null;
  error: string | null;
};

const initialState: LocationName = {
  city: "",
  country: "",
  error: "",
};

export const LoadCurrentLocationName = createAsyncThunk(
  "loadCurrentLocationName/fetch",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const coordinates = state.coordinates;
    const { latitude, longitude } = coordinates.coordinates;

    const data = await findCityByCoordinates(latitude, longitude);
    return data;
  },
);

export const locationNameSlice = createSlice({
  name: "locationName",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      LoadCurrentLocationName.fulfilled,
      (state, action: PayloadAction<LocationName>) => {
        state.city = action.payload.city;
        state.country = action.payload.country;
      },
    );
    builder.addCase(LoadCurrentLocationName.rejected, (state) => {
      state.error = "Unknown location";
    });
  },
});

export const { actions } = locationNameSlice;
export default locationNameSlice.reducer;
