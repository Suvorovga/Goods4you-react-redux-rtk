import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMeResponse, IUserResponse } from "./models/user.model";

export interface LoginProps {
  username: string;
  password: string;
}

export const authorization = createApi({
  reducerPath: "authorization/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/auth/",
  }),
  endpoints: (build) => ({
    login: build.mutation<IUserResponse, LoginProps>({
      query: ({ username, password }) => ({
        url: "login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      }),
    }),
    me: build.query<IMeResponse, string | null>({
      query: (token) => ({
        url: "me",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyMeQuery } = authorization;
