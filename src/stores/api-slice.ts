import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/shared/config/env';
import { LOCAL_STORAGE_KEYS } from '@/shared/utils/global-constant-util';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: env.baseUrl,
      prepareHeaders: (headers, { endpoint }) => {
        const endpointsWithoutAuth = [
          `${env.baseUrl}/auth/sign-in`,
          `${env.baseUrl}/auth/sign-up`,
        ];
        if (!endpointsWithoutAuth.includes(endpoint)) {
          const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN_KEY);
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        }
        return headers;
      },
    });
    const response = await baseQuery(args, api, extraOptions);

    return response;
  },
  endpoints: () => ({}),
});

export default apiSlice;
