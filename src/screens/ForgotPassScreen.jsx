import {
  Alert,
  AppState,
  Button,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
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
import { AuthContext } from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
import { COLORS } from "../theme/theme";
import { Session } from '@supabase/supabase-js'
import { supabase } from "../store/supabase";
import { useSelector } from "react-redux";



function ForgotPassScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)







  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primaryBackground }}>
      <StatusBar hidden={true} />
      <View style={{ marginTop: 10, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => {
              navigation.push("GetStarted");
            }}
            style={{
              backgroundColor: COLORS.primaryButtonBlueNavi,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 10,
              marginLeft: 16,
            }}
          >
            <ArrowLeftIcon size="20" color={COLORS.primaryBackground} />
          </TouchableOpacity>
          {/* End Back button */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginRight: 90,
          }}
        >
          {/* <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/get_started/c2.png")}
            style={{ width: 275, height: 183 }}
          /> */}
        </View>
      </View>
      {/* 2nd View */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primaryCardBackground,
          paddingHorizontal: 32,
          paddingTop: 250,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginTop: -220 }}>
            <Text
              style={{
                color: COLORS.primaryTitle,
                marginLeft: 16,
                marginBottom: 10,
                fontSize: 14,
              }}
            >
              Enter your account email:
            </Text>
            <TextInput
              placeholder="Enter Email"
              aria-disabled={loading}
              // onChangeText={(text) => setEmail(text)}
              style={{
                padding: 16,
                backgroundColor: COLORS.primaryBackground,
                borderRadius: 16,
                marginBottom: 16,
                marginVertical: 16,
                fontSize: 12,
              }}
            />
            <TouchableOpacity
              // onPress={() => signInWithEmail()}
              disabled={loading}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonBlue,
                borderRadius: 100,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primaryBackground,
                }}
              >
                Confirm Email
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ForgotPassScreen;
