import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pricesListSlice, productsSlice } from "./products";
import { userSlice } from "./user";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  prices: pricesListSlice.reducer,
  user: userSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})