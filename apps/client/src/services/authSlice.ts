import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginData>({
      query: (data) => ({ url: `/login`, method: "POST", body: { data } }),
    }),
    getAvailableReviewers: builder.query<AvailableReviewers, void>({
      query: () => `/available-reviewers`,
    }),
    createAccount: builder.mutation<number, CreateAccountDto>({
      query: (data) => ({
        url: `/create-account`,
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGetAvailableReviewersQuery,
  useGetAvailableReviewersQuery,
  useCreateAccountMutation,
} = authApi;

// Types
export type LoginData = {
  email: string;
  password: string;
};

export type AvailableReviewers = {
  name: string;
  id: number;
};

export type CreateAccountDto = {
  email: string;
  password: string;
  reviewerId?: number;
  reviewerName?: string;
};
