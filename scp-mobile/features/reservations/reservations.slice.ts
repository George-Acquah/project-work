import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { initialReservationState } from "../states";
import {
  RequestReservation,
  _IReservationParams,
  reserveSlot,
} from "@/api/reservations";
import { RootState } from "@/store";

interface _IFetchAvailableSlots extends _IReservationParams {
  center_id: string;
  pageSize: number;
}

interface _IReserveSlot extends _IReservationParams {
  center_id: string;
  slot_id: string;
  vehicle_id: string;
}
export const fetchAvailableSlots = createAsyncThunk(
  "reservation/availableSlots",
  async (params: _IFetchAvailableSlots) => {
    try {
      const { start_time, reservation_duration, center_id, pageSize, callbackUrl, start_date } = params;
      const result =  await RequestReservation(center_id, pageSize, {
        start_time,
        start_date,
        reservation_duration,
        callbackUrl
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
);
export const slotReservation = createAsyncThunk(
  "reservation/slotReservation",
  async (params: _IReserveSlot) => {
    try {
      const {
        start_time,
        start_date,
        reservation_duration,
        center_id,
        slot_id,
        vehicle_id,
        callbackUrl
      } = params;
      return await reserveSlot(center_id, slot_id, vehicle_id, {
        start_time,
        start_date,
        reservation_duration,
        callbackUrl
      });
    } catch (error) {
      throw error;
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialReservationState,
  reducers: {
    setStartTime: (state, action: PayloadAction<string>) => {
      state.start_time = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.start_date = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        console.log(action.payload.data.documents);
        state.isLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.availableSlots = action.payload.data.documents;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })
      .addCase(slotReservation.fulfilled, (state, action) => {
        state.reservation_loading = false;
        state.reservation_error = null;
        state.message = action.payload.message;
        state.reservedSlot = action.payload.data;
      })
      .addCase(slotReservation.pending, (state) => {
        state.reservation_loading = true;
        state.reservation_error = null;
      })
      .addCase(slotReservation.rejected, (state, action) => {
        console.log(action);
        state.reservation_loading = false;
        state.message = null;
        state.reservation_error = action.error.message!;
      });
  },
});

export const { setDuration, setStartTime, setStartDate } = reservationSlice.actions;

export const selectAvailableSlots = (state: RootState) =>
  state.reservation.availableSlots;

export const selectMemoedAvailableSlots = createSelector(
  [selectAvailableSlots],
  (availableSlots) => availableSlots.map((slot) => slot._id)
);

export const selectStartTIme = (state: RootState) =>
  state.reservation.start_time;

export const selectStartDate = (state: RootState) =>
  state.reservation.start_date;

export const selectDuration = (state: RootState) => state.reservation.duration;

export const selectAvailableSlotsLoading = (state: RootState) =>
  state.reservation.isLoading;

export const selectIsAvailableSlotsError = (state: RootState) =>
  state.reservation.error;

export const selectReservationError = (state: RootState) =>
  state.reservation.reservation_error;

export const selectReservationLoading = (state: RootState) =>
  state.reservation.reservation_loading;

export const selectReservations = (state: RootState) => state.reservation.reservations;

export const selectReservedSlot = (state: RootState) =>
  state.reservation.reservedSlot;
export default reservationSlice.reducer;
