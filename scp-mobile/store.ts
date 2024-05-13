import authSlice from "@/features/auth/auth.slice";
import bookingsSlice from "@/features/bookings/bookings.slice";
import centersSlice from "@/features/centers/centers.slice";
import slotsSlice from "@/features/slots/parking-slots.slice";
import mapSlice from "@/features/map/map.slice";
import permissionsSlice from "@/features/permissions/permissions.slice";
import rootSlice from "@/features/root.slice";
import { configureStore } from "@reduxjs/toolkit";
import reservationsSlice from "@/features/reservations/reservations.slice";
import vehiclesSlice from "@/features/vehicles/vehicles.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingsSlice,
    map: mapSlice,
    center: centersSlice,
    vehicle: vehiclesSlice,
    slot: slotsSlice,
    root: rootSlice,
    permission: permissionsSlice,
    reservation: reservationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
