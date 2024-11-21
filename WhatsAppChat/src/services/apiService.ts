import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "ChatHistory",
    "Settings"
  ]
});


