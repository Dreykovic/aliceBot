import apiSlice from '@/stores/api-slice';
import {
  Bookmaker,
  Employee,
  PaymentMethod,
  EmployeePaymentMethod,
  Order,
} from '@/types/models-interfaces';

interface EmployeeGetParams {
  bookmaker_id: number;
  payment_method_id: number;
  country_code: string;
}
interface EmployeePaymentGetParams {
  bookmaker_id: number;
  payment_method_id: number;
  employee_id: number;
}
interface DepositParams {
  chat_id: string;
  country: string;
}

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => `payment_methods`,
      providesTags: ['PaymentMethods'], // Ajouter un tag
    }),
    getBookmakers: builder.query<Bookmaker[], void>({
      query: () => `bookmakers`,
      providesTags: ['Bookmakers'], // Ajouter un tag
    }),
    getCaissierByPMAndBookmaker: builder.query<Employee[], EmployeeGetParams>({
      query: ({ bookmaker_id, payment_method_id, country_code }) =>
        `employees/filter/${bookmaker_id}/${payment_method_id}/${country_code}`,
      providesTags: ['Employees'], // Ajouter un tag
    }),

    getEmployeePaymentMethod: builder.query<
      EmployeePaymentMethod,
      EmployeePaymentGetParams
    >({
      query: ({ bookmaker_id, payment_method_id, employee_id }) =>
        `employee_payement_methodes/filter/${employee_id}/${bookmaker_id}/${payment_method_id}`,
      providesTags: ['EmployeePaymentMethods'], // Ajouter un tag
    }),
    deposit: builder.mutation({
      query: (data: Order) => ({
        url: 'orders/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        'PaymentMethods',
        'Bookmakers',
        'Employees',
        'EmployeePaymentMethods',
      ], // Invalider les caches
    }),
    // Endpoint : POST http://127.0.0.1:8000/api/clients/get_or_create/<chat_id:str>
    getOrCreateClient: builder.mutation({
      query: ({ chat_id, country }: DepositParams) => ({
        url: `clients/get_or_create/${chat_id}`,
        method: 'POST',
        body: { id_chat: chat_id, country },
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
