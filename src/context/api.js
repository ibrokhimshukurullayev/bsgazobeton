import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.bsgazobeton.uz/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    const language = localStorage.getItem("language") || "uz_Uz";

    headers.set("Accept-Language", language);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Product", "Category", "Vakansiya", "Auth"],
  endpoints: () => ({}),
});
