import apiSlice from '@/stores/api-slice';

import { Order } from '../types/forms-interfaces';
import {
  Bookmaker,
  Employee,
  PaymentMethod,
  EmployeePaymentMethod,
} from '../types/models-interfaces';
interface EmployeeGetParams {
  bookmaker_id: number;
  payment_method_id: number;
}
interface EmployeePaymentGetParams {
  bookmaker_id: number;
  payment_method_id: number;
  employee_id: number;
}
interface DepositParams {
  chat_id: string;
}
const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => `payment_methods`,
    }),
    getBookmakers: builder.query<Bookmaker[], void>({
      query: () => `bookmakers`,
    }),
    getCaissierByPMAndBookmaker: builder.query<Employee[], EmployeeGetParams>({
      query: ({ bookmaker_id, payment_method_id }) =>
        `employees/filter/${bookmaker_id}/${payment_method_id}`,
    }),
    getEmployeePaymentMethod: builder.query<
      EmployeePaymentMethod,
      EmployeePaymentGetParams
    >({
      query: ({ bookmaker_id, payment_method_id, employee_id }) =>
        `employee_payement_methode_by_employee_and_bookmaker_and_payement_methode/${employee_id}/${bookmaker_id}/${payment_method_id}`,
    }),
    deposit: builder.mutation({
      query: (data: Order) => ({
        url: 'orders/create',
        method: 'POST',
        body: data,
      }),
    }),
    //Endpoint : POST http://127.0.0.1:8000/api/clients/get_or_create/<chat_id:str>
    getOrCreateClient: builder.mutation({
      query: ({ chat_id }: DepositParams) => ({
        url: `clients/get_or_create/${chat_id}`,
        method: 'POST',
        body: { id_chat: chat_id },
      }),
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPaymentMethodsQuery,
  useGetBookmakersQuery,
  useGetCaissierByPMAndBookmakerQuery,
  useGetEmployeePaymentMethodQuery,
  useDepositMutation,
  useGetOrCreateClientMutation,
} = appApi;
