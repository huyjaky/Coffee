import {
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

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

function LoginScreen2({ session }) {
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    } else {

      // Login success
      authCtx.login()
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primaryBackground }}>
      <StatusBar hidden={true} />
      <View style={{ marginTop: 10, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("GetStarted");
            }}
            style={{
              backgroundColor: "#f8c0aa",
              padding: 10,
              borderTopRightRadius: 16,
              marginLeft: 16,
            }}
          >
            {/* <Ionicons name="arrow-back" size="20" color="black" />; */}
            <ArrowLeftIcon size="20" color="#693a27" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            // alignItems: "center",
            marginRight: 90,
          }}
        >
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/get_started/c2.png")}
            style={{ width: 275, height: 183 }}
          />
        </View>
      </View>
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
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
          >
            <Text
              style={{
                color: COLORS.primaryTitle,
                marginLeft: 16,
                marginBottom: 8,
                fontSize: 14,
              }}
            >
              Email Address
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(300).duration(1000).springify()}
          >
            <TextInput
              placeholder="Enter Email"
              aria-disabled={loading}
              onChangeText={(text) => setEmail(text)}
              style={{
                padding: 16,
                backgroundColor: COLORS.primaryBackground,
                borderRadius: 16,
                marginBottom: 16,
                fontSize: 12,
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
          >
            <Text
              style={{
                color: COLORS.primaryTitle,
                marginLeft: 16,
                marginBottom: 8,
                fontSize: 14,
              }}
            >
              Password
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(500).duration(1000).springify()}
          >
            <TextInput
              placeholder="Enter Password"
              aria-disabled={loading}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              style={{
                padding: 16,
                backgroundColor: COLORS.primaryBackground,
                borderRadius: 16,
                marginBottom: 50,
                fontSize: 12,
              }}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >

            <TouchableOpacity
              onPress={()=>signInWithEmail()}
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
                Login
              </Text>
            </TouchableOpacity>


          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("SignUp");
              }}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonGreen,
                borderRadius: 100,
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primaryTextBlue,
                }}
              >
                Create an account
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 12,
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
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen2;
