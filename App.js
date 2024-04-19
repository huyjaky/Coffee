import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import { useContext, useState } from "react";
import { Provider } from "react-redux";
import TabNavigator from "./src/navigators/TabNavigator";
import DetailsScreen from "./src/screens/DetailsScreen";
import GetStartedScreen2 from "./src/screens/GetStartedScreen2";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen2 from "./src/screens/LoginScreen2";
import PaymentScreen from "./src/screens/PaymentScreen";
import SignupScreen2 from "./src/screens/SignupScreen2";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import { store } from "./src/store/states/store";
import CartScreen from "./src/screens/CartScreen";
import ManageOrderScreen from "./src/screens/ManageOrderScreen";
import ManageProductScreen from "./src/screens/ManageProductScreen";
import ManageUserScreen from "./src/screens/ManageUserScreen";
import Account from "./src/screens/AccountScreen";

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
          <Navigation />
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
