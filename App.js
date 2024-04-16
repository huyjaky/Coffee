import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import DetailsScreen from "./src/screens/DetailsScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import TabNavigator from "./src/navigators/TabNavigator";
import TabAuth from "./authenticate/TabAuth";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { useContext, useState } from "react";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import GetStartedScreen2 from "./src/screens/GetStartedScreen2";
import LoginScreen2 from "./src/screens/LoginScreen2";
import SignupScreen2 from "./src/screens/SignupScreen2";
import CartScreen from "./src/screens/CartScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ManageOrderScreen from "./src/screens/ManageOrderScreen";
import ManageProductScreen from "./src/screens/ManageProductScreen";

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ animation: "slide_from_bottom" }}
      ></Stack.Screen>
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ animation: "slide_from_bottom" }}
      ></Stack.Screen>
      <Stack.Screen
        name="ManageOrder"
        component={ManageOrderScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="ManageProduct"
        component={ManageProductScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="GetStarted" component={GetStartedScreen2} />
      <Stack.Screen name="Login" component={LoginScreen2} />
      <Stack.Screen name="SignUp" component={SignupScreen2} />
      <Stack.Screen name="Home" component={HomeScreen} />

    </Stack.Navigator>
  );
}

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? (
        <AuthenticatedStack />
      ) : (
        // <LoginScreen isAuth={isAuth} setIsAuth={setIsAuth} />
        // <SignupScreen />
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
