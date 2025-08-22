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
    getAllOrders: build.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params,
      }),
      providesTags: ["Orders"],
    }),
    saveOrderItems: build.mutation({
      query: (body) => ({
        url: "/orders/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
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
  useGetAllOrdersQuery,
} = orderApi;
