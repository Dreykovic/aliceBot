import apiSlice from '@/stores/api-slice';
import { Order } from '@/types/models-interfaces';

interface OrderListParam {
  chat_id: string;
}
const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query<Order[], OrderListParam>({
      query: ({ chat_id }) => `orders/filter/${chat_id}`,
    }),

    //Endpoint : POST http://127.0.0.1:8000/api/clients/get_or_create/<chat_id:str>
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrderListQuery } = appApi;
