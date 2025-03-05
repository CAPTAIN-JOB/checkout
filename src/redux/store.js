import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice';
import booksApi from "../redux/books/booksApi";
import ordersApi from './features/orders/ordersApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers here
    [booksApi.reducerPath]: booksApi.reducer,
     [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});
