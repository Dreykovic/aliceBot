import { Client } from '@/types/models-interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  created: Boolean;
  client?: Client;
}

const initialState: UserState = {
  created: false,
};
export const userSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<UserState>) => {
      state.created = action.payload.created;
      state.client = action.payload.client;
    },
  },
});

export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
