import apiSlice from '@/stores/api-slice';
import { ClientBookmaker } from '@/types/models-interfaces';

interface CLientBookmakersListParam {
  chat_id: string;
}
const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientBookmakersList: builder.query<
      ClientBookmaker[],
      CLientBookmakersListParam
    >({
      query: ({ chat_id }) => `clients/bookmakers/indendifiants/get/${chat_id}`,
      providesTags: ['Bookmakers'], // Ajouter un tag
    }),
    createClientBookmaker: builder.mutation({
      query: (data: ClientBookmaker) => ({
        url: 'clients/bookmakers/indendifiants/create',
        method: 'POST',
        body: data,
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
  useCreateClientBookmakerMutation,
} = appApi;
