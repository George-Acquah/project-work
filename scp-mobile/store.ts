import { Reducer, UnknownAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/auth.slice";
import bookingsSlice from "@/features/bookings/bookings.slice";
import centersSlice from "@/features/centers/centers.slice";
import slotsSlice from "@/features/slots/parking-slots.slice";
import mapSlice from "@/features/map/map.slice";
import permissionsSlice from "@/features/permissions/permissions.slice";
import rootSlice from "@/features/root.slice";
import reservationsSlice from "@/features/reservations/reservations.slice";
import vehiclesSlice from "@/features/vehicles/vehicles.slice";
import sessionSlice from "./features/session/session.slice";
import toastSlice from "./features/toast/toast.slice";
import errorSlice from "./features/error/error.slice";
import { _IAuthState, _IBookingState, _ICenters, _IErrorState, _IFormState, _IMapState, _IPermission, _IResrvations, _IRoots, _ISessionState, _ISlots, _IToastState, _IVehicles } from "./features/types";
import formsSlice from "./features/forms/forms.slice";

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
  session: _ISessionState;
  toast: _IToastState;
  error: _IErrorState;
  form: _IFormState
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
  session: sessionSlice,
  toast: toastSlice,
  error: errorSlice,
  form: formsSlice,
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
