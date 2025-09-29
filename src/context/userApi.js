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

    updateUserProfile: build.mutation({
      query: (body) => ({
        url: "/users/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useGetUserInfoQuery, useUpdateUserProfileMutation } = userApi;
