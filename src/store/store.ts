import { configureStore } from "@reduxjs/toolkit";

import { cartReducer, cartSlice } from "./slices/cart.slice";
import { api } from "./api";
import { authorization } from "./login";
import { userReducer, userSlice } from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartReducer,
    [userSlice.name]: userReducer,
    [api.reducerPath]: api.reducer,
    [authorization.reducerPath]: authorization.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authorization.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
