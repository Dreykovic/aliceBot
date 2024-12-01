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
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrderListQuery } = appApi;
