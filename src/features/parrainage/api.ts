import apiSlice from '@/stores/api-slice';

export type RetraitParrainage = {
  client: number;
  montant_retrait: number;
  numero_retrait: string;
};
const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    withdrawReferral: builder.mutation({
      query: (data: RetraitParrainage) => ({
        url: 'drawal/request/create',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useWithdrawReferralMutation } = appApi;
