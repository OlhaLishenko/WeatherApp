import { findCoordsByCity } from "@/api/findCoordsByCity";
import { SearchCity } from "@/types/SearchCity";
import { State } from "@/types/State";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: State<SearchCity> = {
  data: {
    latitude: null,
    longitude: null,
    country: null,
    city: null,
    timezone: null,
  },
  loader: false,
  error: null,
};

export const fetchNewLocation = createAsyncThunk(
  "fetch/newLocation",
  async (city: string) => {
    const newCityCoords = await findCoordsByCity(city);
    const formattedData = {
      latitude: newCityCoords.latitude,
      longitude: newCityCoords.longitude,
      country: newCityCoords.country,
      city: city,
      timezone: newCityCoords.timezone,
    };

    return formattedData;
  },
);

export const searchCitySlice = createSlice({
  name: "searchCity",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<SearchCity>) {
      state.data = action.payload;
      state.error = null;
    },
    setError(state) {
      state.error = "Can not load data";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNewLocation.pending, (state) => {
      state.error = null;
      state.loader = true;
    });
    builder.addCase(
      fetchNewLocation.fulfilled,
      (state, action: PayloadAction<SearchCity>) => {
        state.data = action.payload;
        state.error = null;
        state.loader = false;
      },
    );
    builder.addCase(fetchNewLocation.rejected, (state) => {
      state.error = "Can not load location coordinates";
      state.loader = false;
    });
  },
});

export const { actions } = searchCitySlice;
export default searchCitySlice.reducer;
