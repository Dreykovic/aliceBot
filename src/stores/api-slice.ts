import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';
import { Bookmaker } from '@/types/models-interfaces';
interface CLientCreateParams {
  chat_id: string;
  country?: string;
  nom: string | null;
  prenom: string | null;
  username: string | null;
}
interface CLientUpdateParams {
  chat_id: string;
  codeparainageclient: string;
}
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

  // refetchOnReconnect: false, // Relance toutes les requêtes après une reconnexion
  // refetchOnFocus: false, // Relance toutes les requêtes après un retour en focus
  // keepUnusedDataFor: 50000, // Garde les données en cache 5 minutes globalement

  endpoints: (builder) => ({
    getBookmakers: builder.query<Bookmaker[], void>({
      query: () => `bookmakers`,
      providesTags: ['Bookmakers'], // Ajouter un tag
    }),
    checkCodeParrain: builder.query({
      query: ({ code }) => `codeparainages/check/${code}`,
    }),
    getOrCreateClient: builder.mutation({
      query: ({ chat_id, country, nom, prenom }: CLientCreateParams) => ({
        url: `clients/get_or_create/${chat_id}`,
        method: 'POST',
        body: { id_chat: chat_id, country, nom, prenom },
      }),
    }),
    updateClient: builder.mutation({
      query: ({ chat_id, codeparainageclient }: CLientUpdateParams) => ({
        url: `clients/update/${chat_id}`,
        method: 'PUT',
        body: { id_chat: chat_id, codeparainageclient },
      }),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBookmakersQuery,
  useGetOrCreateClientMutation,
  useUpdateClientMutation,
  useCheckCodeParrainQuery,
} = apiSlice;
export default apiSlice;
