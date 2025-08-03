import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query({
      query: () => ({
        url: "/users/info",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
