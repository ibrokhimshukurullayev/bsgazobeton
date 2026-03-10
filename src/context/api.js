import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { normalizeApiPayload } from "./responseNormalize";
import { API_BASE_URL } from "../config/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
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

const normalizedBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQueryWithRetry(args, api, extraOptions);

  if (result?.data) {
    return {
      ...result,
      data: normalizeApiPayload(result.data),
    };
  }

  return result;
};

export const api = createApi({
  reducerPath: "mainApi",
  baseQuery: normalizedBaseQuery,
  tagTypes: ["Product", "Category", "Vakansiya", "Auth", "Orders", "News"],
  endpoints: () => ({}),
});
