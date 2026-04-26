import { findCityByCoordinates } from "@/api/findCityByCoordinates";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
type LocationName = {
  city: string | null;
  country: string | null;
  error: string | null;
};

const initialState: LocationName = {
  city: null,
  country: null,
  error: null,
};

export const LoadCurrentLocationName = createAsyncThunk(
  "loadCurrentLocationName/fetch",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const coordinates = state.coordinates;
    const { latitude, longitude } = coordinates.data;

    const data = await findCityByCoordinates(latitude, longitude);
    return data;
  },
);

export const locationNameSlice = createSlice({
  name: "locationName",
  initialState,
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.city = action.payload;
      state.country = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      LoadCurrentLocationName.fulfilled,
      (state, action: PayloadAction<LocationName>) => {
        state.city = action.payload.city;
        state.country = action.payload.country;
        state.error = null;
      },
    );
    builder.addCase(LoadCurrentLocationName.rejected, (state) => {
      state.error = "Unknown location";
    });
  },
});

export const { actions } = locationNameSlice;
export default locationNameSlice.reducer;
