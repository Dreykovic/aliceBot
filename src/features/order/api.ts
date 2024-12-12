import apiSlice from '@/stores/api-slice';
import {
  Employee,
  PaymentMethod,
  EmployeePaymentMethod,
  OrderCreate,
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

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => `payment_methods`,
      providesTags: ['PaymentMethods'], // Ajouter un tag
    }),
    // getBookmakers: builder.query<Bookmaker[], void>({
    //   query: () => `bookmakers`,
    //   providesTags: ['Bookmakers'], // Ajouter un tag
    // }),
    getCaissierByPMAndBookmaker: builder.query<Employee[], EmployeeGetParams>({
      query: ({ bookmaker_id, payment_method_id, country_code }) =>
        `employees/filter/${bookmaker_id}/${payment_method_id}/${country_code}`,
      providesTags: ['Employees'], // Ajouter un tag
    }),
    getAllCaissier: builder.query<Employee[], void>({
      query: () => `employees`,
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
      query: (data: OrderCreate) => ({
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
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPaymentMethodsQuery,
  useGetAllCaissierQuery,
  useGetCaissierByPMAndBookmakerQuery,
  useGetEmployeePaymentMethodQuery,
  useDepositMutation,
} = appApi;
