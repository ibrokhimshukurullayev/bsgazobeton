import { api } from "./api";

export const contactApi = api.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
