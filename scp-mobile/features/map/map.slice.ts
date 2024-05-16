import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { mapInitialState } from "../states";
import { RootState } from "@/store";

const mapSlice = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    setDestination: (state, action: PayloadAction<_IDestination | null>) => {
      state.destination = action.payload;
    },
    setOrigin: (
      state,
      action: PayloadAction<_IDestination>
    ) => {
      state.origin = action.payload;
    },
    setTravelTIme: (state, action: PayloadAction<string>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setDestination, setOrigin, setTravelTIme } = mapSlice.actions;


export const selectDestination = (state: RootState) => state.map.destination;

export const selectOrigin = (state: RootState) => state.map.origin;

export const selectTime = (state: RootState) => state.map.travelTimeInformation;

export default mapSlice.reducer;
