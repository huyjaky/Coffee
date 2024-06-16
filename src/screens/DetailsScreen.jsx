import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import PaymentFooter from "../components/PaymentFooter";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { supabase } from "../store/supabase";

function DetailsScreen({ navigation, isManage = false }) {
  const ItemofIndex = useSelector((state) => state.products.currentDetailCart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {}, [ItemofIndex]);

  const Tab = createMaterialTopTabNavigator();
  const [price, setPrice] = useState(ItemofIndex.manage_prices[0]);
  console.log(ItemofIndex);

  function BackHandler() {
    navigation.pop();
  }

  async function addToCartDB(id_pr, prices_id) {
    const { data, error } = await supabase.rpc("add_product_to_cart", {
      user_id_vr: user.user.id,
      id_pr_vr: id_pr,
      prices_id_vr: prices_id,
      is_inscrease: true,
    });
    if (error) console.log("add to card by pay", error);
  }

  function HomeScreen() {
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.infoTitle}>Description</Text>
        <Text style={styles.infoText}>{ItemofIndex.des}</Text>
      </View>
    );
  }

  function IngredientScreen() {
    return (
      <FlatList
        data={[
          { key: "Ingredients", value: ItemofIndex.ingredients },
          { key: "Special Ingredients", value: ItemofIndex.special_ingredient },
        ]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.key}</Text>
            <Text style={styles.cardText}>{item.value}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
    );
  }

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          item={ItemofIndex}
          BackHandler={BackHandler}
        />
        <Tab.Navigator>
          <Tab.Screen name="Information" component={HomeScreen} />
          <Tab.Screen name="Ingredient" component={IngredientScreen} />
        </Tab.Navigator>
        {isManage == false ? (
          <PaymentFooter
            price={price.prices.price}
            buttonTitle="Add to Cart"
            buttonPressHandler={() => {
              const temp = {
                ...ItemofIndex,
                manage_prices: [{ prices: { ...price.prices }, quantity: 1 }],
              };
              dispatch(productsSlice.actions.ADD_TO_CART(temp));
              dispatch(productsSlice.actions.CACULATE_CART_PRICE());
              addToCartDB(
                ItemofIndex.id_pr,
                ItemofIndex.manage_prices[0].prices.prices_id
              );
              BackHandler();
            }}
          />
        ) : (
          <View></View>
        )}
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  tabContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryBackground,
  },
  listContainer: {
    padding: 20,
  },
  infoTitle: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 18,
    color: COLORS.primaryButtonBlueNavi,
    marginBottom: 10,
  },
  infoText: {
    letterSpacing: 0.5,
    fontWeight: "600",
    fontSize: 14,
    color: "#230C02",
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.primaryBackgroundCard,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.primaryTitle,
  },
  cardText: {
    fontSize: 14,
    color: "#230C02",
  },
});
