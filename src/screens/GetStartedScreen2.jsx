import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FlipInEasyX,
  FlipOutEasyX,
  FlipInXUp,
  BounceInDown,
  BounceInUp,
} from "react-native-reanimated";
import { useEffect } from "react";
import { supabase } from "../store/supabase";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../store/states/products";

function GetStartedScreen2() {
  const navigation = useNavigation();
  const productsList = useSelector((state) => state.products.productsList)
  const dispatch = useDispatch()

  async function fetchManagePrices() {
    const { data, error } = await supabase.from('manage_prices').select("*")
    if (error) console.log(error);
    dispatch(updateProducts(data))

  }

  useEffect(() => {
    fetchManagePrices()
  }, [])

  useEffect(()=>{
    console.log(productsList);
  },[productsList])

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
