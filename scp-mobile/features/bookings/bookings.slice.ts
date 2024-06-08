import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingsInitialState } from "../states";
import { RootState } from "@/store";

// This will be for the actual implementation
interface _IBookingUrls {
  upcomingUrl: string;
  historyUrl: string;
  favouriteUrl: string;
}

// For testing
interface _IBookingData {
  upcomingUrl: _IBooking[];
  historyUrl: _IBooking[];
  favouriteUrl: _IFavoriteParkingCenter[];
}

export function fetchData<T = any>(data: T, timeout: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (bookingUrls: _IBookingData) => {
    try {
      const { upcomingUrl, historyUrl, favouriteUrl } = bookingUrls;

      const [upcomingResponse, historyResponse, favoritesResponse] =
        await Promise.all([
          fetchData<_IBooking[]>(upcomingUrl, 300),
          fetchData<_IBooking[]>(historyUrl, 300),
          fetchData<_IFavoriteParkingCenter[]>(favouriteUrl, 300),
        ]);

      return {
        upcomingBookings: upcomingResponse,
        bookingHistory: historyResponse,
        favoriteParkingCenters: favoritesResponse,
      };
    } catch (error) {
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: bookingsInitialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    handleOpenMap: (state) => {
      state.openMap = true;
    },

    handleCloseMap: (state) => {
      state.openMap = false;
    },

    setShowDetailsModal: (state, action: PayloadAction<boolean>) => {
      state.openMap = action.payload;
    },
    handleShowDetailsModal: (
      state,
      action: PayloadAction<_IBooking | _IFavoriteParkingCenter>
    ) => {
      state.selectedBooking = action.payload;
      state.showDetailsModal = true;
    },
    handleCloseDetailsModal: (state) => {
      state.selectedBooking = null;
      state.showDetailsModal = false;
      state.openMap = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingBookings = action.payload.upcomingBookings;
        state.bookingHistory = action.payload.bookingHistory;
        state.favoriteParkingCenters = action.payload.favoriteParkingCenters;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { setSelectedTab, handleOpenMap, handleCloseMap, handleCloseDetailsModal, handleShowDetailsModal } = bookingSlice.actions;

export const selectSelctedTab = (state: RootState) => state.booking.selectedTab;

export const selectOpenMap = (state: RootState) => state.booking.openMap;

export const selectShowDetailsModal = (state: RootState) => state.booking.showDetailsModal

export const selectSelectedBooking = (state: RootState) => state.booking.selectedBooking;

export const selectUpcomingBookings = (state: RootState) =>
  state.booking.upcomingBookings;

export const selectBookingsHistory = (state: RootState) =>
  state.booking.bookingHistory;

export const selectFavoriteCenters = (state: RootState) =>
  state.booking.favoriteParkingCenters;

export const selectBookingLoading = (state: RootState) =>
  state.booking.isLoading;

export default bookingSlice.reducer;
