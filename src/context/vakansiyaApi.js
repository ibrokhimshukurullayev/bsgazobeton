import { api } from "./api";

export const vakansiyaApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Get all vakansiyalar
    getVakansiyalar: build.query({
      query: (params) => ({
        url: "/vacancies/getall",
        params,
      }),
      providesTags: ["Vakansiya"],
    }),

    // Get single vakansiya
    getVakansiyaSingle: build.query({
      query: (id) => ({
        url: `/vacancies/${id}`,
      }),
      providesTags: ["Vakansiya"],
    }),

    // Create vakansiya
    createVakansiya: build.mutation({
      query: (body) => ({
        url: "/vacancies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vakansiya"],
    }),

    // Delete vakansiya
    deleteVakansiya: build.mutation({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vakansiya"],
    }),

    // Update vakansiya
    updateVakansiya: build.mutation({
      query: ({ body, id }) => ({
        url: `/vacancies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Vakansiya"],
    }),
  }),
});

export const {
  useGetVakansiyalarQuery,
  useGetVakansiyaSingleQuery,
  useCreateVakansiyaMutation,
  useDeleteVakansiyaMutation,
  useUpdateVakansiyaMutation,
} = vakansiyaApi;
