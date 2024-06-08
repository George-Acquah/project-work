import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionInitialState } from "../states";
import { RootState } from "@/store";

const sessionSlice = createSlice({
  name: "session",
  initialState: sessionInitialState,
  reducers: {
    showModal(state, action: PayloadAction<string | undefined>) {
      state.showModal = true;
      state.callbackUrl = action.payload;
    },
    hideModal(state) {
      state.showModal = false;
      state.callbackUrl = undefined;
    },
  },
});

export const { showModal, hideModal } = sessionSlice.actions;

export const selectShowSessionModal = (state: RootState) => state.session.showModal;

export const selectCallbackUrl = (state: RootState) => state.session.callbackUrl;

export default sessionSlice.reducer;
