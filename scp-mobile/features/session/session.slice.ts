import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionInitialState } from "../states";

const sessionSlice = createSlice({
  name: "session",
  initialState: sessionInitialState,
  reducers: {
    showModal(state, action: PayloadAction<string | null>) {
      state.showModal = true;
      state.callbackUrl = action.payload;
    },
    hideModal(state) {
      state.showModal = false;
      state.callbackUrl = null;
    },
  },
});

export const { showModal, hideModal } = sessionSlice.actions;
export default sessionSlice.reducer;
