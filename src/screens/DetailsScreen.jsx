import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import PaymentFooter from "../components/PaymentFooter";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
function DetailsScreen({ navigation, route }) {
  // console.log("route = ", route.params);
  const ItemofIndex = useSelector((state) => state.products.currentDetailCart);
  const dispatch = useDispatch()
  useEffect(() => { }, [ItemofIndex])

  const Tab = createMaterialTopTabNavigator();
  const [price, setPrice] = useState(ItemofIndex.manage_prices[0]);
  console.log(ItemofIndex);

  function BackHandler() {
    navigation.pop();
  }
  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{ItemofIndex.des}</Text>
      </View>
    );
  }

  function IngredientScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{ItemofIndex.ingredients}</Text>
        <Text>{ItemofIndex.special_ingredient}</Text>
      </View>
    );
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          item={ItemofIndex}
          BackHandler={BackHandler}
        />
        <Tab.Navigator ta>
          <Tab.Screen name="Information" component={HomeScreen} />
          <Tab.Screen name="Ingredient" component={IngredientScreen} />
          {/* <Tab.Screen name="Special Ingredient" component={SettingsScreen} /> */}
        </Tab.Navigator>
        
        <PaymentFooter
          price={price.prices.price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            const temp = { ...ItemofIndex, manage_prices: [{ prices: { ...price.prices }, quantity: 1 }] }
            dispatch(productsSlice.actions.ADD_TO_CART(temp))
            dispatch(productsSlice.actions.CACULATE_CART_PRICE())
            BackHandler()
          }}
        />
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: 20,
  },
  InfoTitle: {
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 18,
    color: COLORS.primaryButtonBlueNavi,
    marginBottom: 10,
  },
  InfoTitleSize: {
    fontSize: 20,
    color: COLORS.primaryTitle
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontWeight: '800',
    fontSize: 14,
    color: '#230C02',
    marginBottom: 30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryBackgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
  },
  SizeText: {
    fontWeight: '600',
  },
});
