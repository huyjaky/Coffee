import { useNavigation } from "@react-navigation/native";
import { Component, useEffect, useState } from "react";
import { Alert, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";

function GetStartedScreen() {
  const navigation = useNavigation();
  const productsList = useSelector((state) => state.products.productsList);
  const productsList2 = useSelector((state) => state.products.productsList2);
  const CartList = useSelector((state) => state.products.CartList);
  const OrderHistoryList = useSelector((state) => state.OrderHistoryList);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState({
    productsList: false,
    productsList2: false,
  });

  useEffect(() => {
    dispatch(productsSlice.actions.CACULATE_CART_PRICE());
  }, [CartList, OrderHistoryList]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*,manage_prices(prices(*))")
      .eq("category_pr", "medical equipment").neq("status", "unrealease")
      .then((data) => {
        dispatch(productsSlice.actions.UPDATE_PRODUCTS(data.data));
        if (error) Alert.alert(error);
        setIsLoading({ ...isLoading, productsList: true });
        console.log('data test', data.data[0].manage_prices);
      });
  }

  async function fetchProducts2() {
    const { data, error } = await supabase
      .from("products")
      .select("*,manage_prices(prices(*))")
      .eq("category_pr", "medicine").neq("status", "unrealease")
      .then((data) => {
        dispatch(productsSlice.actions.UPDATE_PRODUCTS2(data.data));
        if (error) Alert.alert(error);
        setIsLoading({ ...isLoading, productsList2: true });
      });
  }

  useEffect(() => {
    fetchProducts();
    fetchProducts2();
  }, []);

  useEffect(() => {
    dispatch(productsSlice.actions.UPDATE_FAVORITE_LIST(productsList.concat(productsList2)));
  }, [productsList2, productsList]);

  useEffect(() => {}, [isLoading]);

  if (isLoading.productsList && isLoading.productsList2) {
    return <LoadingScreen />;
  }

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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000)}
            exiting={FadeOutDown.duration(1000)}
            source={require("../assets/get_started/Med.png")}
            style={{ width: 450, height: 450 }}
          />
        </View>
                <Animated.View
          style={{ justifyContent: "center", alignItems: "center" }}
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutDown.duration(1000)}
        >
          <Text
            style={{
              color: COLORS.primaryNovel,
              fontWeight: "bold",
              fontSize: 32,
              textAlign: "center",
            }}
          >
            Medical App
          </Text>
        </Animated.View>
        <View style={{ marginTop: 16 }}>
          <Animated.View
            entering={FadeIn.delay(400).duration(1000)}
            exiting={FadeOut.duration(1000)}
          >
            <TouchableOpacity
              onPress={() => navigation.push("SignUp")}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonGreen,
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
                Sign up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{ flexDirection: "row", justifyContent: "center" }}
            entering={FadeInUp.delay(600).duration(1000)}
            exiting={FadeOutDown.duration(1000)}
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

export default GetStartedScreen;
