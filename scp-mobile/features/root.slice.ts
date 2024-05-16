import { Center_Filter } from "@/utils/enums/global.enum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store";

interface _InitialState {
  showOnboarding: boolean;
  viewMap: boolean;
  nearbyMap: boolean;
  centersFilter: string | null;
}
const initialState: _InitialState = {
  showOnboarding: true,
  viewMap: false,
  nearbyMap: true,
  centersFilter: Center_Filter.AVAILABLE,
}

const rootSlice = createSlice({
  name: "root",
  initialState,
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
    setCentersFilter: (state, action: PayloadAction<string>) => {
      state.centersFilter = action.payload;
    }
  },
});

export const {disableShowOnboarding, showMap, collpaseMap, hideNearbyMap, showNearbyMap, setCentersFilter } = rootSlice.actions;

export const selectOnboardingStatus = (state: RootState) => state.root.showOnboarding;

export const selectViewMap = (state: RootState) => state.root.viewMap;

export const selectNearbyMap = (state: RootState) => state.root.nearbyMap;
export const selectCentersFilter = (state: RootState) => state.root.centersFilter;

export default rootSlice.reducer;