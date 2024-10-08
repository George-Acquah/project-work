import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store";
import { rootInitialState } from "./states";
import { Center_Filter } from "@/utils/enums/global.enum";

const rootSlice = createSlice({
  name: "root",
  initialState: rootInitialState,
  reducers: {
    disableShowOnboarding: (state) => {
      state.showOnboarding = false;
    },
    showMap: (state) => {
      state.viewMap = true;
    },
    collpaseMap: (state) => {
      state.viewMap = false;
    },
    showNearbyMap: (state) => {
      state.nearbyMap = true;
    },
    hideNearbyMap: (state) => {
      state.nearbyMap = false;
    },
    setCentersFilter: (state, action: PayloadAction<Center_Filter>) => {
      state.centersFilter = action.payload;
    },
  },
});

export const {disableShowOnboarding, showMap, collpaseMap, hideNearbyMap, showNearbyMap, setCentersFilter } = rootSlice.actions;

export const selectOnboardingStatus = (state: RootState) => state.root.showOnboarding;

export const selectViewMap = (state: RootState) => state.root.viewMap;

export const selectNearbyMap = (state: RootState) => state.root.nearbyMap;
export const selectCentersFilter = (state: RootState) => state.root.centersFilter;

export const selectSlotsFilter = (state: RootState) =>
  state.root.slotsFilter;

export default rootSlice.reducer;