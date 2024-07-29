import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct, IProductsResponse } from "./models/product.model";

export interface GetNextPageProductsProps {
  q: string;
  skip: number;
}

export const api = createApi({
  reducerPath: "products/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products/",
  }),
  endpoints: (build) => ({
    getProducts: build.query<IProductsResponse, string>({
      query: (q) => ({
        url: "search",
        params: {
          q,
          limit: "12",
          skip: 0,
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }),
    }),
    getNextPageProducts: build.query<
      IProductsResponse,
      GetNextPageProductsProps
    >({
      query: ({ q, skip }) => ({
        url: "search",
        params: {
          q: q,
          limit: "12",
          skip: String(skip),
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }),
    }),
    getProductById: build.query<IProduct, string>({
      query: (id) => ({
        url: id,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetNextPageProductsQuery,
  useGetProductByIdQuery,
} = api;
