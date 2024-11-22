import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";
import ProductsPageReducer from "./screens/productsPage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";
import HomePageReducer from "./screens/Homepage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
