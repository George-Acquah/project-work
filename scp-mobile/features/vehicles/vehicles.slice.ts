import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { vehiclesInitialState } from "../states";
import { allVehicles, usersVehicles } from "@/api/vehicles";
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

export const fetchUsersVehicles = createAsyncThunk(
  "center/fetchUsersVehicles",
  async () => {
    try {
      const response = await usersVehicles();
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
    setSelectedVehicle: (state, action: PayloadAction<string>) => {
      state.selectedVehicle = action.payload;
    },
    removeSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload.data;
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
      .addCase(fetchUsersVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload.data;
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchUsersVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.message = null;
        state.error = action.error.message!;
      });

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

export const { setSelectedVehicle, removeSelectedVehicle } = vehicleSlice.actions;

export const selectAllVehicles = (state: RootState) =>
  state.vehicle.vehicles;

export const selectMemoedVehicles = createSelector(
  [selectAllVehicles],
  (vehicles) => vehicles.map((vehicle) => vehicle._id)
);

export const selectSelectedVehicle = (state: RootState) => state.vehicle.selectedVehicle;

export const selectVehiclesLoading = (state: RootState) =>
  state.vehicle.isLoading;
export const selectVehiclesError = (state: RootState) => state.vehicle.error;

export default vehicleSlice.reducer;
