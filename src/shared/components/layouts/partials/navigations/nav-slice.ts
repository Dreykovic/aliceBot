import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NavState {
  status: 'VISIBLE' | 'HIDDEN';
}

const initialState: NavState = {
  status: 'VISIBLE',
};
export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNavStatus: (state, action: PayloadAction<NavState>) => {
      state.status = action.payload.status;
    },
  },
});

export const { setNavStatus } = navSlice.actions;

export default navSlice.reducer;
