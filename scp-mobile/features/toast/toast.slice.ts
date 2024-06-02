import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toastInitialState } from "../states";
import { RootState } from "@/store";

// Function to generate a unique ID
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

const toastSlice = createSlice({
  name: 'toast',
  initialState: toastInitialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<_IToast, 'id'>>) => {
      const id = generateId();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const selectToasts = (state: RootState) => state.toast.toasts;

export default toastSlice.reducer;
