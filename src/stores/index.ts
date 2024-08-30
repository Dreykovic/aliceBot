import { configureStore } from '@reduxjs/toolkit';

import headerSlice from '@/shared/components/layouts/partials/header/header-slice';
import env from '@/shared/config/env';

import apiSlice from './api-slice';

import messageReducer from './message-slice';

const combinedReducer = {
  header: headerSlice,
  message: messageReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const store = configureStore({
  reducer: combinedReducer,
  devTools: env.appState !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
