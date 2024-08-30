import apiSlice from '@/stores/api-slice';

import { FormValues } from './validations';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query<FormValues, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = appApi;
