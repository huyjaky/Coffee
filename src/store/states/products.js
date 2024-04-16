import { createSlice } from "@reduxjs/toolkit";
import { ADD_TO_ORDER_HISTORY_LIST_FROM_CART, TOGGLE_FAVORITE, UPDATE_CARTLIST, UPDATE_FAVORITE_LIST, UPDATE_PRICESLIST, UPDATE_PRODUCTS } from "./actions";
import { supabase } from "../supabase";
import { Alert } from "react-native";

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
    UPDATE_CURRENT_DETAIL_CART: (state, action) => {
      state.currentDetailCart = action.payload
      return state
    },
    UPDATE_FAVORITE_LIST: (state, action) => {
      state.FavoritesList = action.payload.filter((item) => item.favourite == true)
      return state
    },
    UPDATE_CARTLIST : (state, action) =>{
      state.CartList = action.payload
      return state
    },
    ADD_TO_CART: (state, action) => {
      console.log('action', action);
      let found = false;
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id_pr === action.payload.id_pr) {
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
      if (state.CartList.length !== 0) console.log(state.CartList[0].manage_prices);
    },
    INCREATEMENT_CART_ITEM_QUANTITY: (state, action) => {
      console.log('action', action);
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id_pr === action.payload.id_pr) {
          for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
            if (state.CartList[i].manage_prices[j].prices.size == action.payload.prices.size) {
              state.CartList[i].manage_prices[j].quantity++;
              break;
            }
          }
        }
      }
    },
    DECREATEMENT_CART_ITEM_QUANTITY: (state, action) => {
      for (let i = 0; i < state.CartList.length; i++) {
        if (state.CartList[i].id_pr == action.payload.id_pr) {
          for (let j = 0; j < state.CartList[i].manage_prices.length; j++) {
            if (state.CartList[i].manage_prices[j].prices.size == action.payload.prices.size) {
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
    TOGGLE_FAVORITE: (state, action) => {
      // remove it from fvlist
      if (action.payload.favourite == true) {
        state.FavoritesList = state.FavoritesList.filter(item => item.id_pr !== action.payload.id_pr);

        // change values favour in local client
        state.productsList = state.productsList.map((item) => {
          if (item.id_pr === action.payload.id_pr) {
            item.favourite = false
          }
          return item
        })
        state.productsList2 = state.productsList2.map((item) => {
          if (item.id_pr === action.payload.id_pr) {
            item.favourite = false
          }
          return item
        })
      } else if (action.payload.favourite == false) {
        state.FavoritesList.push({ ...action.payload, favourite: true })

        // change values favour in local client
        state.productsList = state.productsList.map((item) => {
          if (item.id_pr === action.payload.id_pr) {
            item.favourite = true
          }
          return item
        })
        state.productsList2 = state.productsList2.map((item) => {
          if (item.id_pr === action.payload.id_pr) {
            item.favourite = true
          }
          return item
        })
        console.log('test', state.productsList[0].favourite);
      }
      return state
    },
    ADD_TO_ORDER_HISTORY_LIST_FROM_CART: (state, action) => {
      let temp = state.CartList.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.ItemPrice),
        0
      );
      if (state.OrderHistoryList.length > 0) {
        state.OrderHistoryList.unshift({
          OrderDate:
            new Date().toDateString() +
            " " +
            new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      } else {
        state.OrderHistoryList.push({
          OrderDate:
            new Date().toDateString() +
            " " +
            new Date().toLocaleTimeString(),
          CartList: state.CartList,
          CartListPrice: temp.toFixed(2).toString(),
        });
      }
      state.CartList = [];
    }
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
