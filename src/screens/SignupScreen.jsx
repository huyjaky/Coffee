import {
  Button,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../theme/theme";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

function SignupScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isAuthenticated);
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      <StatusBar style="light" hidden={true} />
      <Image
        style={{ height: "100%", width: "100%", position: "absolute" }}
        source={require("../assets/auth/background.png")}
      />

      {/* Lights */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          position: "absolute",
        }}
      >
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          style={{ height: 255, width: 90 }}
          source={require("../assets/auth/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          style={{ height: 160, width: 65 }}
          source={require("../assets/auth/light.png")}
        />
      </View>

      {/* Title and form */}
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-around",
          paddingTop: 220,
        }}
      >
        {/* Title */}
        <Animated.View
          style={{ alignItems: "center" }}
          entering={FadeInDown.delay(200).duration(1000).springify()}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              letterSpacing: 0.5,
              fontSize: 48,
            }}
          >
            Sign Up
          </Text>
        </Animated.View>

        {/* Form */}
        <View
          style={{
            alignItems: "center",
            marginHorizontal: 16,
            marginTop: 16,
            gap: 10,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "#d5d7d9",
              padding: 20,
              borderRadius: 16,
              width: "100%",
            }}
            entering={FadeInDown.duration(1000).springify()}
          >
            <TextInput placeholder="Username" placeholderTextColor={"gray"} />
          </Animated.View>
          <Animated.View
            style={{
              backgroundColor: "#d5d7d9",
              padding: 20,
              borderRadius: 16,
              width: "100%",
            }}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </Animated.View>
          <Animated.View
            style={{
              backgroundColor: "#d5d7d9",
              padding: 20,
              borderRadius: 16,
              width: "100%",
              marginBottom: 12,
            }}
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            style={{ width: "100%" }}
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#38bdf8",
                padding: 12,
                borderRadius: 16,
                marginBottom: 12,
              }}
              onPress={() => {
                navigation.push("Login");
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{ flexDirection: "row", justifyContent: "center" }}
            entering={FadeInDown.delay(800).duration(1000).springify()}
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push("Login");
              }}
            >
              <Text style={{ color: "#0284c7" }}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default SignupScreen;
