import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import { COLORS } from "../theme/theme";
import { BlurView } from "@react-native-community/blur";
import { Ionicons, Entypo } from "@expo/vector-icons";
import AdminScreen from "../screens/AdminScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveBackgroundColor: COLORS.primaryBackground,
        tabBarInactiveBackgroundColor: COLORS.primaryBackground
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryButtonGreen : COLORS.primaryTitle
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="heart"
              size={25}
              color={
                focused ? COLORS.primaryButtonGreen : COLORS.primaryTitle
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="cart"
              size={25}
              color={
                focused ? COLORS.primaryButtonGreen : COLORS.primaryTitle
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="bell"
              size={25}
              color={
                focused ? COLORS.primaryButtonGreen : COLORS.primaryTitle
              }
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="lock"
              size={25}
              color={
                focused ? COLORS.primaryButtonGreen : COLORS.primaryTitle
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: "absolute",
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
