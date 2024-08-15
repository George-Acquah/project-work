import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { formInitialState } from "../states";
import { RootState } from "@/store";
import { _IVehicle, _IVehicleInsurance, _IVReg } from "../types";

const formsSlice = createSlice({
  name: "forms",
  initialState: formInitialState,
  reducers: {
    setVehiclesDetails: (state, action: PayloadAction<_IVehicle>) => {
      state.vehicle = action.payload;
    },
    setVehiclesInsuranceDetails: (state, action: PayloadAction<_IVehicleInsurance>) => {
      state.vehicleInsurance = action.payload;
    },
    setVehiclesRegistrationDetails: (state, action: PayloadAction<_IVReg>) => {
      state.vehicleRegistration = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getLocation.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.message = action.payload.status;
  //       state.currentLocation = {
  //         location: {
  //           lat: action.payload.location.coords.latitude,
  //           lng: action.payload.location.coords.longitude,
  //         },
  //         description: action.payload.direction,
  //       };
  //     })
  //     .addCase(getLocation.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //       state.message = null;
  //     })
  //     .addCase(getLocation.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.message = null;
  //       state.error = action.error.message ?? "";
  //     });
  // },
});

export const {setVehiclesDetails, setVehiclesInsuranceDetails, setVehiclesRegistrationDetails } = formsSlice.actions;

export const selectVehcilesFormData = (state: RootState) => state.form.vehicle;
export const selectVehcilesInsuranceFormData = (state: RootState) => state.form.vehicleInsurance;
export const selectVehcilesRegistrationFormData = (state: RootState) => state.form.vehicleRegistration;

export default formsSlice.reducer;
