import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { slotsInitialState } from "../states";
import { RootState } from "@/store";
import { fetchData } from "../bookings/bookings.slice";
import { slots } from "@/constants/data";
import {
  filteredSlots,
  nearbySlots,
  popularSlots,
  singleSlot,
} from "@/api/slots";

export const fetchPopularSlots = createAsyncThunk(
  "center/fetchPopularSlots",
  async () => {
    try {
      const response = await popularSlots();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchNearbySlot = createAsyncThunk(
  "center/fetchNearbySlot",
  async () => {
    try {
      const response = await nearbySlots();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchFilteredSlots = createAsyncThunk(
  "center/fetchFilteredCenter",
  async (centerParams: _ISlotParams) => {
    try {
      const { slots = "", currentPage = 1, pageSize = 5 } = centerParams;
      const response = await filteredSlots(slots, currentPage, pageSize);

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
      const response = await singleSlot(center_id);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const testSlots = createAsyncThunk("center/testSlots", async () => {
  try {
    const response = await fetchData<_ISlot[]>(slots, 500);

    return response;
  } catch (error) {
    throw error;
  }
});

const slotsSlice = createSlice({
  name: "center",
  initialState: slotsInitialState,
  reducers: {
    setSelectedSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlot = action.payload;
    },

    saveFavoriteCenter: (state, action: PayloadAction<string>) => {
      const index = state.popularSlots.findIndex(
        (item) => item._id === action.payload
      );
      if (index === -1) {
        state.message = "You do not have this center";
      } else {
        state.savedSlot = index;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSlots.fulfilled, (state, action) => {
        state.popularSlots = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchPopularSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })

      .addCase(fetchNearbySlot.fulfilled, (state, action) => {
        state.nearbySlot = action.payload.data;
        state.nearbyLoading = false;
        state.nearbyMessage = action.payload.message;
        state.nearbyError = null;
      })
      .addCase(fetchNearbySlot.pending, (state) => {
        state.nearbyLoading = true;
        state.nearbyError = null;
      })
      .addCase(fetchNearbySlot.rejected, (state, action) => {
        state.nearbyLoading = false;
        state.nearbyMessage = null;
        state.nearbyError = action.error.message!;
      })

      .addCase(fetchFilteredSlots.fulfilled, (state, action) => {
        state.filteredSlots = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchFilteredSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })

      .addCase(fetchSingleCenter.fulfilled, (state, action) => {
        state.fetchedSlot = action.payload.data;
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

      .addCase(testSlots.fulfilled, (state, action) => {
        state.nearbySlot = action.payload;
        state.isLoading = false;
        state.message = "Success";
        state.error = null;
      })
      .addCase(testSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(testSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      });
  },
});

export const { setSelectedSlot, saveFavoriteCenter } = slotsSlice.actions;

export const selectPopularSlots = (state: RootState) => state.slot.popularSlots;

export const selectNearbySlots = (state: RootState) => state.slot.nearbySlot;

export const selectSelectedSlotString = (state: RootState) =>
  state.slot.selectedSlot;

export const selectMemoedPopularSlot = createSelector(
  [selectPopularSlots],
  (popularSlots) => popularSlots.map((slot) => slot._id)
);

export const selectMemoedNearbySlot = createSelector(
  [selectNearbySlots],
  (nearbySlot) => nearbySlot.map((slot) => slot._id)
);

export const selectFilteredSlots = (state: RootState) =>
  state.slot.filteredSlots;

export const selectFetchedSlot = (state: RootState) => state.slot.fetchedSlot;

export const selectSelectedSlot = (id: string) =>
  createSelector(
    [selectNearbySlots, selectFilteredSlots, selectPopularSlots],
    (slots) => {
      return slots.find((slot) => slot._id === id);
    }
  );

export const selectMemoedMergedSlots = createSelector(
  [selectFilteredSlots, selectNearbySlots, selectPopularSlots],
  (slots) => slots.map((slot) => slot._id)
);

export const selectSavedSlot = (state: RootState) => state.slot.savedSlot;

export const selectSlotLoading = (state: RootState) => state.slot.isLoading;
export const selectSlotError = (state: RootState) => state.slot.error;

export const selectNearbySlotLoading = (state: RootState) =>
  state.slot.nearbyLoading;
export const selectNearbySlotError = (state: RootState) =>
  state.slot.nearbyError;

export default slotsSlice.reducer;
