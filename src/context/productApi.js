import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Get request
    getProduct: build.query({
      query: (params) => ({
        url: "/products/getall",
        params,
      }),
      providesTags: ["Product"],
    }),

    // Get single product request
    getProductSingle: build.query({
      query: (id) => ({
        url: `/products?productId=${id}`,
      }),
      providesTags: ["Product"],
    }),

    // Post request
    createProduct: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete request
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Updatet request
    updateProduct: build.mutation({
      query: ({ body, id }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useGetProductSingleQuery,
} = productApi;
