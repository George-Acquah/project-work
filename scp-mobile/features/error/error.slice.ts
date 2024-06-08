import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorInitialState } from "../states";

interface _IShowErrorModal {
  message: string;
  button_label: string;
  description?: string;
}
const errorSlice = createSlice({
  name: "error",
  initialState: errorInitialState,
  reducers: {
    showErrorModal: (state, action: PayloadAction<_IShowErrorModal>) => {
      state.visible = true;
      state.message = action.payload.message;
      state.button_label = action.payload.button_label;
      state.description = action.payload.description ?? undefined;
    },
    hideErrorModal: (state) => {
      state.visible = false;
      state.message = null;
      state.button_label = undefined;
      state.description = undefined;
    },
  },
});

export const { showErrorModal, hideErrorModal } = errorSlice.actions;

export const selectErrorMessage = (state: RootState) => state.error.message;

export const selectErrorVisible = (state: RootState) => state.error.visible;

export const selectErrorDescription = (state: RootState) => state.error.description;

export const selectErrorButtonLabel = (state: RootState) => state.error.button_label;

export default errorSlice.reducer;
