import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UPDATE_PRODUCTS } from "./actions";

const initialState = {
  productsList: []
}

export const productsSlice = createSlice({
  name: UPDATE_PRODUCTS,
  initialState,
  reducers: {
    UPDATE_PRODUCTS: (state, action) => {
      state.productsList = state.productsList.concat(action.payload)
      return state
    }
  }
})
