import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Animated, {
  FadeInDown,
  FadeInUp
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { AuthContext } from "../store/auth-context";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";



function LoginScreen() {
  const navigation = useNavigation();

  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.user.user)


  async function signInWithEmail() {
    // setLoading(true)
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // })
    // if (error) {
    //   Alert.alert(error.message)
    // } else {
    //   // Login success
    //   // authCtx.login()
    //   console.log('Test');
    // }
    // setLoading(false)
    authCtx.login()
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#a3c3f2' }}>
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
            <ArrowLeftIcon size="20" color={COLORS.primaryBackground} />
          </TouchableOpacity>
        </View>
        <Text style={{
          flexDirection: "row",
          justifyContent: "center",
          textAlign: 'center',
          fontSize: 36,
          fontWeight: 'bold',
          color: COLORS.primaryNovel,
          marginTop: 20
        }}>WELLCOME BACK!</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/get_started/login.jpg")}
            style={{ width: '100%', height: 200, paddingVertical: 20, marginTop: 40, }}
          />
        </View>

      </View>
      {/* Bottom card */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primaryCardBackground,
          paddingHorizontal: 32,
          paddingTop: 100,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginTop: -70 }}>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
          >
            <Text
              style={{
                color: COLORS.primaryTitle,
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
                fontWeight: 'bold'
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
                marginBottom: 30,
                fontSize: 12,
              }}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            {/* Sign in button */}
            <TouchableOpacity
              onPress={() => signInWithEmail()}
              disabled={loading}
              style={{
                paddingVertical: 12,
                backgroundColor: COLORS.primaryButtonBlue,
                borderRadius: 100,
                marginBottom: 10,
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
          {/* Forgot pass button */}
          <Animated.View
            entering={FadeInDown.delay(700).duration(1000).springify()}
          >
            <TouchableOpacity
              style={{
                paddingTop: 8,
                paddingBottom: 12,
              }}
              onPress={() => navigation.push('ForgotPass')}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: COLORS.primaryTextBlue,
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
            {/* Signup link */}
            <TouchableOpacity
              onPress={() => {
                navigation.push("SignUp");
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 40,
                  color: COLORS.primaryNovel,
                }}
              >
                Don't have one? <Text style={{ color: COLORS.primaryButtonBlue }}> Create account!</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
          >

          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
