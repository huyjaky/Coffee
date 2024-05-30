import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import { useContext, useState } from "react";
import { Provider } from "react-redux";
import TabNavigator from "./src/navigators/TabNavigator";
import DetailsScreen from "./src/screens/DetailsScreen";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import { store } from "./src/store/states/store";
import CartScreen from "./src/screens/CartScreen";
import ManageOrderScreen from "./src/screens/ManageOrderScreen";
import ManageProductScreen from "./src/screens/ManageProductScreen";
import ManageUserScreen from "./src/screens/ManageUserScreen";
import Account from "./src/screens/AccountScreen";
import { NativeBaseProvider } from "native-base";
import NativeBaseScreen from "./src/screens/NativeBaseScreen";
import ForgotPassScreen from "./src/screens/ForgotPassScreen";
import ProfileViewScreen from "./src/screens/ProfileViewScreen";

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
        name="Cart"
        component={CartScreen}
        options={{ animation: 'default' }}
      ></Stack.Screen>
      <Stack.Screen
        name="ManageOrder"
        component={ManageOrderScreen}
        options={{ animation: "slide_from_bottom" }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="ManageProduct"
        component={ManageProductScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="ManageUser"
        component={ManageUserScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="Account2"
        component={ProfileViewScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      {/* Product manager stack */}
      <Stack.Screen
        name="EditProductForm"
        component={ManageOrderScreen}
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
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* dev form */}
      <Stack.Screen name="Dev" component={ManageOrderScreen} />

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
        <Provider store={store}>
          <NativeBaseProvider>
            <Navigation />
          </NativeBaseProvider>
        </Provider>
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
