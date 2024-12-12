import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  message?: string | null;
  type?: 1 | 0;
  title?: string | null;
  success?: boolean;
  show?: boolean;
}

const initialState: AlertState = {
  message: '',
  success: true,
  title: '',
  type: 1,
  show: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.success = action.payload.success ?? initialState.success;
      state.title = action.payload.title ?? initialState.title;
      state.show = true;
    },
    closeAlert: (state) => {
      state.show = false;
      state.message = initialState.message;
      state.title = initialState.title;
      state.success = initialState.success;
      state.type = initialState.type;
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
