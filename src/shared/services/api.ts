import apiSlice from '@/stores/api-slice';

import { Bookmaker, Employee, PaymentMethod } from '../types/models-interfaces';
interface EmployeeGerParams {
  bookmaker_id: number;
  payment_method_id: string;
}
const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => `payment_methods`,
    }),
    getBookmakers: builder.query<Bookmaker[], void>({
      query: () => `bookmakers`,
    }),
    getCaissierByPMAndBookmaker: builder.query<Employee, EmployeeGerParams>({
      query: ({ bookmaker_id, payment_method_id }) =>
        `employees/filter/${bookmaker_id}/${payment_method_id}`,
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPaymentMethodsQuery, useGetBookmakersQuery } = appApi;
