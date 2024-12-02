import apiSlice from '@/stores/api-slice';
import { Bookmaker, ClientBookmaker } from '@/types/models-interfaces';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientBookmakersList: builder.query<
      ClientBookmaker[],
      { chat_id: string }
    >({
      query: ({ chat_id }) => `clients/bookmakers/indendifiants/get/${chat_id}`,
      providesTags: ['Bookmakers'], // Ajouter un tag
    }),
    getBookmaker: builder.query<Bookmaker, { bookmaker_id: string }>({
      query: ({ bookmaker_id }) => `bookmakers/get/${bookmaker_id}`,
      providesTags: ['Bookmakers'], // Ajouter un tag
    }),
    createClientBookmaker: builder.mutation({
      query: (data: Partial<ClientBookmaker>) => ({
        url: 'clients/bookmakers/indendifiants/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Bookmakers'], // Invalider les caches
    }),
    deleteClientBookmaker: builder.mutation({
      query: (client_bookmaker_id: string) => ({
        url: `clients/bookmakers/indendifiants/delete/${client_bookmaker_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookmakers'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClientBookmakersListQuery,
  useGetBookmakerQuery,
  useCreateClientBookmakerMutation,
  useDeleteClientBookmakerMutation,
} = appApi;
