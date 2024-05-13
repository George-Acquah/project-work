import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { permissionsInitialState } from "../states";
import { RootState } from "store";
import * as Location from "expo-location";

export const getLocation = createAsyncThunk(
  "permissions/location",
  async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw {
          message: "Permission to access location was denied",
          code: 400,
        };
      }

      const location = await Location.getCurrentPositionAsync({});

      const [{ street, city, country }] = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      const direction = `${street}, ${city}, ${country}`;

      return {
        location,
        status,
        direction,
      };
    } catch (error) {
      if (!error.code) {
        throw {
          message: error,
        };
      }
      throw error;
    }
  }
);
const permissionSlice = createSlice({
  name: "permissions",
  initialState: permissionsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.status;
        state.currentLocation = {
          location: {
            lat: action.payload.location.coords.latitude,
            lng: action.payload.location.coords.longitude,
          },
          description: action.payload.direction,
        };
      })
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message;
      });
  },
});

export const selectPermissionLoading = (state: RootState) =>
  state.permission.isLoading;

export const selectPermissionMessage = (state: RootState) =>
  state.permission.message;

export const selectPermissionError = (state: RootState) =>
  state.permission.error;

export const selectCurrentLocation = (state: RootState) =>
  state.permission.currentLocation;

export const selectOriginDescription = createSelector(
  selectCurrentLocation,
  (currentLocation) => currentLocation?.description
);

export const selectOriginLat = createSelector(
  selectCurrentLocation,
  (currentLocation) => currentLocation?.location.lat
);

export default permissionSlice.reducer;
