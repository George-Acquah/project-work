import authSlice from "@/features/auth/auth.slice";
import bookingsSlice from "@/features/bookings/bookings.slice";
import centersSlice from "@/features/centers/centers.slice";
import slotsSlice from "@/features/slots/parking-slots.slice";
import mapSlice from "@/features/map/map.slice";
import permissionsSlice from "@/features/permissions/permissions.slice";
import rootSlice from "@/features/root.slice";
import { Reducer, UnknownAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import reservationsSlice from "@/features/reservations/reservations.slice";
import vehiclesSlice from "@/features/vehicles/vehicles.slice";
import { _IAuthState, _IBookingState, _ICenters, _IMapState, _IPermission, _IResrvations, _IRoots, _ISlots, _IVehicles } from "./features/types";

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     booking: bookingsSlice,
//     map: mapSlice,
//     center: centersSlice,
//     vehicle: vehiclesSlice,
//     slot: slotsSlice,
//     root: rootSlice,
//     permission: permissionsSlice,
//     reservation: reservationsSlice,
//   },
// });
export interface RootState {
  auth: _IAuthState;
  booking: _IBookingState;
  map: _IMapState;
  center: _ICenters;
  vehicle: _IVehicles;
  slot: _ISlots;
  root: _IRoots;
  permission: _IPermission;
  reservation: _IResrvations;
}

const appReducer = combineReducers({
  auth: authSlice,
  booking: bookingsSlice,
  map: mapSlice,
  center: centersSlice,
  vehicle: vehiclesSlice,
  slot: slotsSlice,
  root: rootSlice,
  permission: permissionsSlice,
  reservation: reservationsSlice,
});

const rootReducer: Reducer = (state: RootState, action: UnknownAction) => {
  if (action.type === "auth/logout") {
    // this applies to all keys defined in persistConfig(s)
    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      },
    }),
});

// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
