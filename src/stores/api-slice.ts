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
  tagTypes: [
    'PaymentMethods',
    'Bookmakers',
    'Employees',
    'EmployeePaymentMethods',
  ],

  refetchOnReconnect: true, // Relance toutes les requêtes après une reconnexion
  refetchOnFocus: true, // Relance toutes les requêtes après un retour en focus
  keepUnusedDataFor: 300, // Garde les données en cache 5 minutes globalement

  endpoints: () => ({}),
});

export default apiSlice;
