import {
  TCreateUserPayload,
  TCreateUserResponse,
  TGetUserResponse,
  TUpdateUserPayload,
  TUpdateUserResponse,
  TUsersResponse,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 30,
  tagTypes: ["users-list"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<TUsersResponse, number | null>({
      query: (page = 1) => `/users?page=${page}`,
      providesTags: ["users-list"],
    }),
    getUserById: builder.query<TGetUserResponse, { id: number }>({
      query: ({ id }) => `/users/${id}`,
    }),
    createUser: builder.mutation<TCreateUserResponse, TCreateUserPayload>({
      query: (payload) => ({
        url: `/users`,
        body: payload,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation<TUpdateUserResponse, TUpdateUserPayload>({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        body: payload,
        method: "PATCH",
      }),
    }),
    deleteUser: builder.mutation<TGetUserResponse, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userApi;
