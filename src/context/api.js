import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://api.1000kitob.uz/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
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
