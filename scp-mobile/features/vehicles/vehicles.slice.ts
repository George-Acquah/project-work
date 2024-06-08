import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { vehiclesInitialState } from "../states";
import { allVehicles } from "@/api/vehicles";
import { RootState } from "@/store";

export const fetchAllVehicles = createAsyncThunk(
  "center/fetchAllVehicles",
  async (centerParams: _IVehicleParams) => {
    try {
      const { vehicles = "", currentPage = 1, pageSize = 5 } = centerParams;
      const response = await allVehicles(vehicles, currentPage, pageSize);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchSingleVehicle = createAsyncThunk(
//   "center/fetchSingleVehicle",
//   async (center_id: string) => {
//     try {
//       const response = await singleCenter(center_id);

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: vehiclesInitialState,
  reducers: {
    // setSelectedVehicle: (state, action: PayloadAction<_IParkingCenter>) => {
    //   state.selectedCenter = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        // state.popularCenters = action.payload.data;
        state.vehicles = action.payload.data
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchAllVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      })

      // .addCase(fetchSingleVehicle.fulfilled, (state, action) => {
      //   state.fetchedCenter = action.payload.data;
      //   state.isLoading = false;
      //   state.message = action.payload.message;
      //   state.error = null;
      // })
      // .addCase(fetchSingleVehicle.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(fetchSingleVehicle.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.message = null;
      //   state.error = action.error.message;
      // });
  },
});

export const { } = vehicleSlice.actions;

export const selectAllVehicles = (state: RootState) =>
  state.vehicle.vehicles;

export const selectMemoedVehicles = createSelector(
  [selectAllVehicles],
  (vehicles) => vehicles.map((vehicle) => vehicle._id)
);

export const selectVehiclesLoading = (state: RootState) =>
  state.vehicle.isLoading;
export const selectVehiclesError = (state: RootState) => state.vehicle.error;

export default vehicleSlice.reducer;
