import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthPayload, User } from '@/shared/types/api';
import localStorageUtil from '@/shared/utils/local-storage-utils';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  authUser: User | null;
}

const initialState: AuthState = {
  token: localStorageUtil.getAccessToken(),
  isAuthenticated: localStorageUtil.isAuthenticated(),
  authUser: localStorageUtil.getUserData(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    makeGlobalLogin: (state, action: PayloadAction<AuthPayload>) => {
      localStorageUtil.updateAccessToken(action.payload.token);
      localStorageUtil.setUserData(action.payload.user);
      state.token = action.payload.token;
      state.authUser = action.payload.user;
      state.isAuthenticated = true;
      window.location.href = '/';
    },
    makeGlobalLogout: (state) => {
      localStorageUtil.clearToken();
      localStorageUtil.clearUserData();
      localStorage.clear();
      state.token = null;
      state.authUser = null;
      state.isAuthenticated = false;
      window.location.href = '/';
    },
  },
});

export const { makeGlobalLogin, makeGlobalLogout } = authSlice.actions;

export default authSlice.reducer;
