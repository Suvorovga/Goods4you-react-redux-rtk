import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart, ICartsResponse } from "../models/cart.model";
import { validateResponse } from "../validateResponse";

export const fetchCartsByUser = createAsyncThunk<ICartsResponse, number>(
  "carts/fetchCarts",
  async function (id) {
    return fetch(`https://dummyjson.com/carts/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(validateResponse)
      .then((data) => data.json());
  }
);

interface UpdateCart {
  cartId: number;
  productId: number;
  quantity: number;
}

export const updateCart = createAsyncThunk<ICart, UpdateCart>(
  "carts/updateCart",
  async function ({ cartId, productId, quantity }) {
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merge: false,
        products: [
          {
            id: productId,
            quantity: quantity,
          },
        ],
      }),
    });

    const data = await response.json();

    return data;
  }
);

interface initialState extends ICartsResponse {
  message?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export const initialState: initialState = {
  carts: [],
  total: 0,
  skip: 0,
  limit: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartsByUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchCartsByUser.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchCartsByUser.fulfilled, (state, action) => {
      state = {
        ...action.payload,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
      return state;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      // Изменение статуса
      state.isLoading = false;
      state.isError = false;

      // Продукт в ответе от сервера
      const productResponse = action.payload.products[0];

      // Корзина пользователя в локальном стейте
      const localCart = state.carts[0];

      // Проверка на наличие данного продукта в корзине пользователя
      const localProduct = localCart?.products.find(
        (it) => it.id === productResponse.id
      );

      // Изменение существующего продукта или добавление нового и
      // изменение общего количества в корзине
      if (localProduct && localCart && localCart.products.length > 0) {
        localProduct.quantity = productResponse.quantity;
        localCart.totalQuantity = localCart.products.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      } else if (localCart) {
        localCart.products.push(productResponse);
        localCart.totalQuantity = localCart.products.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      }
    });
    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const cartAction = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
