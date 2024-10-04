import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: env.baseUrl,
    });
    const response = await baseQuery(args, api, extraOptions);

    return response;
  },
  endpoints: () => ({}),
});

export default apiSlice;
