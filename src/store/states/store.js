import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pricesListSlice, productsSlice } from "./products";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
  prices: pricesListSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})