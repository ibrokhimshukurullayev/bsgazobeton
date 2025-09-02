import { api } from "./api";

export const newsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // GET all news
    getNews: build.query({
      query: (params) => ({
        url: "/posts/getall",
        params: params,
      }),
      providesTags: ["News"],
    }),

    getNewsSingle: build.query({
      query: (id) => ({
        url: `/posts?postid=${id}`,
      }),
      providesTags: ["News"],
    }),

    // CREATE news
    createNews: build.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    // UPDATE news
    updateNews: build.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["News"],
    }),

    // DELETE news
    deleteNews: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsSingleQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
