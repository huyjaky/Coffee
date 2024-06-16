import {
  Alert,
  AppState,
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
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { COLORS } from "../theme/theme";
import { supabase } from "../store/supabase";



function SignupScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPass, setCurrentPass] = useState('')

  async function signUpWithEmail() {
    if (password === '') {
      Alert.alert('Please check your password!')
    }
    setLoading(true)
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    // a rest
    if (!error) {
      authCtx.login()
    }
    setLoading(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff1ee' }}>
      <StatusBar hidden={true} />
      <View style={{ marginTop: 10, flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
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
            {/* <Ionicons name="arrow-back" size="20" color="black" />; */}
            <ArrowLeftIcon size="20" color={COLORS.primaryBackground} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/get_started/signup.jpg")}
            style={{ width: '100%', height: 193 }}
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
            entering={FadeInUp.delay(100).duration(1000).springify()}
          >
            <Text
              style={{
                color: COLORS.primaryTextBlue,
                marginLeft: 16,
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              Email Address
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(150).duration(1000).springify()}
          >
            <TextInput
              onChangeText={(text) => setEmail(text)}
              aria-disabled={loading}
              placeholder="Enter Email"
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
            entering={FadeInUp.delay(200).duration(1000).springify()}
          >
            <Text
              style={{
                color: COLORS.primaryTextBlue,
                marginLeft: 16,
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              Password
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(300).duration(1000).springify()}
          >
            <TextInput
              onChangeText={(text) => setCurrentPass(text)}
              disabled={loading}
              placeholder="Enter Password"
              secureTextEntry
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
                color: COLORS.primaryTextBlue,
                marginLeft: 16,
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              Re-Enter Password
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(500).duration(1000).springify()}
          >
            <TextInput
              onChangeText={(text) => {
                if (currentPass === text) {
                  setPassword(text)
                }
              }}
              disabled={loading}
              placeholder="Enter Password"
              secureTextEntry
              style={{
                padding: 16,
                backgroundColor: COLORS.primaryBackground,
                borderRadius: 16,
                marginBottom: 40,
                fontSize: 12,
              }}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => signUpWithEmail()}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonGreen,
                borderRadius: 100,
                marginBottom: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
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
            entering={FadeInDown.delay(800).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.push("Login");
              }}
              style={{
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primaryTextBlue,
                }}
              >
                Already have an account?
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default SignupScreen;
