import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Client } from '@/types/models-interfaces';

interface UserState {
  created: boolean;
  client?: Client;
}

const initialState: UserState = {
  created: false,
  client: undefined,
};
export const userSlice = createSlice({
  name: 'user',
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
