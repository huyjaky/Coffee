import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ADD_TO_CART, CACULATE_CART_PRICE, DECREATEMENT_CART_ITEM_QUANTITY, INCREATEMENT_CART_ITEM_QUANTITY, UPDATE_CURRENT_DETAIL_CART, UPDATE_PRICESLIST, UPDATE_PRODUCTS, UPDATE_PRODUCTS2 } from "./actions";

const initialState = {
  productsList: [],
  productsList2: [],
  currentDetailCart: {},
  pricesList: [],
  CartList: [],
  CartPrice: 0,
  FavoritesList: [],
  OrderHistoryList: []
}


export const productsSlice = createSlice({
  name: UPDATE_PRODUCTS,
  initialState,
  reducers: {
    UPDATE_PRODUCTS: (state, action) => {
      state.productsList = state.productsList.concat(action.payload)
      return state
    },
    UPDATE_PRODUCTS2: (state, action) => {
      state.productsList2 = state.productsList2.concat(action.payload)
      return state
    },
    UPDATE_CURRENT_DETAIL_CART: (state, action) =>{
      state.currentDetailCart = action.payload
      return state
    },
    ADD_TO_CART: (state, action) => {
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id === action.payload.id) {
          found = true;
          let size = false;
          for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
            if (
              state.CartList[i].manage_prices[j].prices.size === action.payload.manage_prices[0].prices.size
            ) {
              size = true;
              state.CartList[i].manage_prices[j].quantity++;
              break;
            }
          }
          if (size == false) {
            state.CartList[i].manage_prices.push(action.payload.manage_prices[0]);
          }
          state.CartList[i].manage_prices.sort((a, b) => {
            if (a.prices.size > b.prices.size) {
              return -1;
            }
            if (a.prices.size < b.prices.size) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      if (found === false) {
        state.CartList.push(action.payload);
      }

    },
    INCREATEMENT_CART_ITEM_QUANTITY: (state, action) => {
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id_pr === action.payload.id_pr) {
          for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
            if (state.CartList[i].manage_prices[j].prices.size == action.payload.size) {
              state.CartList[i].manage_prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    DECREATEMENT_CART_ITEM_QUANTITY: (state, action) => {
      for (let i = 0; i < state.CartList.length ; i++) {
        if (state.CartList[i].id_pr == action.payload.id_pr) {
          for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
            if (state.CartList[i].manage_prices[j].prices.size == action.payload.size) {
              if (state.CartList[i].manage_prices.length > 1) {
                if (state.CartList[i].manage_prices[j].quantity > 1) {
                  state.CartList[i].manage_prices[j].quantity--;
                } else {
                  state.CartList[i].manage_prices.splice(j, 1);
                }
              } else {
                if (state.CartList[i].manage_prices[j].quantity > 1) {
                  state.CartList[i].manage_prices[j].quantity--;
                } else {
                  state.CartList.splice(i, 1);
                }
              }
              break;
            }
          }
        }
      }
    },
    CACULATE_CART_PRICE: (state, action) => {
      let totalPrice = 0;
      for (let i = 0; i < state.CartList.length; i++) {
        let tempprice = 0;
        for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
          tempprice =
            tempprice +
            parseFloat(state.CartList[i].manage_prices[j].prices.price) *
            state.CartList[i].manage_prices[j].quantity;
        }
        state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
        totalPrice = totalPrice + tempprice;
      }
      state.CartPrice = totalPrice.toFixed(2).toString();
    },
  }
})

export const pricesListSlice = createSlice({
  name: UPDATE_PRICESLIST,
  initialState,
  reducers: {
    UPDATE_PRICESLIST: (state, action) => {
      state.pricesList = state.pricesList.concat(action.payload)
      return state
    }
  }
})
