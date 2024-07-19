import {
  availableCenters,
  nearbyCenters,
  popularCenters,
  singleCenter,
} from "@/api/centers";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { centersInitialState } from "../states";
import { RootState } from "@/store";
import { fetchData } from "../bookings/bookings.slice";
import { centers } from "@/constants/data";

export const fetchPopularCenters = createAsyncThunk(
  "center/fetchPopularCenters",
  async (centerParams: _ICenterParams) => {
    try {
      const { centers = "", currentPage = 1, pageSize = 5 } = centerParams;
      const response = await popularCenters(centers, currentPage, pageSize);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchNearbyCenters = createAsyncThunk(
  "center/fetchNearbyCenters",
  async (centerParams: _ICenterParams) => {
    try {
      const { centers = "", currentPage = 1, pageSize = 5 } = centerParams;
      const response = await nearbyCenters(centers, currentPage, pageSize);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAvailableCenters = createAsyncThunk(
  "center/fetchAvailableCenters",
  async (centerParams: _ICenterParams) => {
    try {
      const { centers = "", currentPage = 1, pageSize = 5 } = centerParams;
      const response = await availableCenters(centers, currentPage, pageSize);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleCenter = createAsyncThunk(
  "center/fetchSingleCenter",
  async (center_id: string) => {
    try {
      const response = await singleCenter(center_id);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const testCenters = createAsyncThunk("center/testCenters", async () => {
  try {
    const response = await fetchData<_IParkingCenter[]>(centers, 500);

    return response;
  } catch (error) {
    throw error;
  }
});

const centerSlice = createSlice({
  name: "center",
  initialState: centersInitialState,
  reducers: {
    setSelectedCenter: (state, action: PayloadAction<_IParkingCenter>) => {
      state.selectedCenter = action.payload;
    },

    saveFavoriteCenter: (state, action: PayloadAction<string>) => {
      const index = state.popularCenters.findIndex(
        (item) => item._id === action.payload
      );
      if (index === -1) {
        state.message = "You do not have this center";
      } else {
        state.savedCenter = index;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCenters.fulfilled, (state, action) => {
        state.popularCenters = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchPopularCenters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularCenters.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })

      .addCase(fetchNearbyCenters.fulfilled, (state, action) => {
        // state.nearbyCenters = action.payload.data;
        state.nearbyLoading = false;
        state.nearbyMessage = action.payload.message;
        state.nearbyError = null;
      })
      .addCase(fetchNearbyCenters.pending, (state) => {
        state.nearbyLoading = true;
        state.nearbyError = null;
      })
      .addCase(fetchNearbyCenters.rejected, (state, action) => {
        state.nearbyLoading = false;
        state.nearbyMessage = null;
        state.nearbyError = action.error.message!;
      })

      .addCase(fetchAvailableCenters.fulfilled, (state, action) => {
        // state.availableCenters = action.payload.data;
        state.availableLoading = false;
        state.availableMessage = action.payload.message;
        state.availableError = null;
      })
      .addCase(fetchAvailableCenters.pending, (state) => {
        state.availableLoading = true;
        state.availableError = null;
      })
      .addCase(fetchAvailableCenters.rejected, (state, action) => {
        state.availableLoading = false;
        state.availableMessage = null;
        state.availableError = action.error.message!;
      })

      .addCase(fetchSingleCenter.fulfilled, (state, action) => {
        state.fetchedCenter = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchSingleCenter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })

      .addCase(testCenters.fulfilled, (state, action) => {
        state.popularCenters = action.payload;
        state.isLoading = false;
        state.message = "Success";
        state.error = null;
      })
      .addCase(testCenters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(testCenters.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      });
  },
});

export const { setSelectedCenter, saveFavoriteCenter } = centerSlice.actions;

export const selectPopularCenters = (state: RootState) =>
  state.center.popularCenters;

export const selectNearbyCenters = (state: RootState) =>
  state.center.nearbyCenters;

export const selectAvailableCenters = (state: RootState) =>
  state.center.availableCenters;

export const selectMemoedPopularCenter = createSelector(
  [selectPopularCenters],
  (popularCenters) => popularCenters.map((center) => center._id)
);

export const selectMemoedNearbyCenter = createSelector(
  [selectNearbyCenters],
  (nearbyCenters) => nearbyCenters.map((center) => center._id)
);

export const selectMemoedAvailbleCenter = createSelector(
  [selectAvailableCenters],
  (availableCenters) => availableCenters.map((center) => center._id)
);



export const selectFetchedCenter = (state: RootState) =>
  state.center.fetchedCenter;

export const selectSelectedCenter = (state: RootState) =>
  state.center.selectedCenter;

export const selectSavedCenter = (state: RootState) => state.center.savedCenter;

export const selectCenterLoading = (state: RootState) => state.center.isLoading;
export const selectCenterError = (state: RootState) => state.center.error;

export const selectNearbyCenterLoading = (state: RootState) =>
  state.center.nearbyLoading;
export const selectNearbyCenterError = (state: RootState) =>
  state.center.nearbyError;

export const selectAvailableCenterLoading = (state: RootState) =>
  state.center.availableLoading;
export const selectAvailableCenterError = (state: RootState) =>
  state.center.availableError;

export default centerSlice.reducer;
