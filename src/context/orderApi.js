import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),
    saveOrderItems: build.mutation({
      query: (body) => ({
        url: "/orders/save",
        method: "POST",
        body,
      }),
    }),
    getUserOrders: build.query({
      query: () => ({
        url: "/orders/cart",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useSaveOrderItemsMutation,
  useGetUserOrdersQuery,
} = orderApi;
