import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./products";

const rootReducer = combineReducers({
  products: productsSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer
})