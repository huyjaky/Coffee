import { useNavigation } from "@react-navigation/native";
import { Component, useEffect, useState } from "react";
import { Alert, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GetStartedScreen2() {
  const navigation = useNavigation();
  const productsList = useSelector((state) => state.products.productsList)
  const productsList2 = useSelector((state) => state.products.productsList2)
  const CartList = useSelector(state => state.products.CartList)
  const dispatch = useDispatch()


  async function getLocalStorage() {
      await AsyncStorage.getItem('SaveCart').then(value => dispatch(productsSlice.actions.UPDATE_CARTLIST(JSON.parse(value))))
  }

  useEffect(()=>{
    console.log(CartList)
    dispatch(productsSlice.actions.CACULATE_CART_PRICE())
  },[CartList])

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select("*, manage_prices(prices(prices_id, size, unit, price))").eq('type_pr', 'Bean')
    dispatch(productsSlice.actions.UPDATE_PRODUCTS(data))
    if (error) Alert.alert(error)
  }

  async function fetchProducts2() {
    const { data, error } = await supabase.from('products').select("*, manage_prices(prices(prices_id, size, unit, price))").eq('type_pr', 'Coffee')
    dispatch(productsSlice.actions.UPDATE_PRODUCTS2(data))
    if (error) Alert.alert(error)
  }

  useEffect(() => {
    fetchProducts()
    fetchProducts2()
    getLocalStorage()
  }, [])

  useEffect(() => {
    dispatch(productsSlice.actions.UPDATE_FAVORITE_LIST(productsList.concat(productsList2)))
  }, [productsList2, productsList])

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primaryBackground }}>
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          marginVertical: "16",
        }}
      >
        <Animated.View
          style={{ justifyContent: "center", alignItems: "center" }}
          // entering={BounceInUp.springify()
          //   .damping(2)
          //   .stiffness(10)
          //   .overshootClamping(false)}
          entering={FadeInUp.duration(1000).springify()}
        >
          <Text
            style={{
              color: "#230C02",
              fontWeight: "bold",
              fontSize: 32,
              textAlign: "center",
            }}
          >
            Let's Get Started!
          </Text>
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            // position: "absolute",
          }}
        >
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            source={require("../assets/get_started/c11.png")}
            style={{ width: 225, height: 225 }}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => navigation.push("SignUp")}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonBlue,
                marginHorizontal: 28,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primaryBackground,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{ flexDirection: "row", justifyContent: "center" }}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <Text style={{ color: "#230C02" }}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push("Login");
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: COLORS.primaryTitle }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default GetStartedScreen2;
