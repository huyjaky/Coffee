import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EmptyListAnimation from "../components/EmptyListAnimation";
import HeaderBar from "../components/HeaderBar";
import OrderHistoryCard from "../components/OrderHistoryCard";
import PopUpAnimation from "../components/PopUpAnimation";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import { supabase } from "../store/supabase";

function OrderHistoryScreen({ navigation }) {
  const OrderHistoryList = useSelector((state) => state.products.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  // console.log("History length = ", OrderHistoryList.length);
  // console.log("History = ", OrderHistoryList);

  async function localStored() {
    await AsyncStorage.setItem('SaveOrderHistory', JSON.stringify(OrderHistoryList))
  }

  useEffect(() => { localStored() }, [OrderHistoryList])

  function navigationHandler() {
    navigation.push("Details");
  }

  function buttonPressHandler() {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    // setTimeout(() => {
    //   navigation.push("FeedBack");
    // }, 2000);
  }

  async function fetchIdCartList() {
    // const { data ,count, error } = await supabase.from('order_history').select('*', {count: 'exact', head: 'true'}).eq('id', user.user.id)
    // console.log('count', count);
    // console.log('data', data);
    // if (!error) return count
    const { data, error } = await supabase.rpc('products')
    console.log(data)
  }

  async function fetchCartList() {
    const { data, error } = await supabase.from('products').select("*, manage_prices:order_history(prices(*), id, order_time, quantity)")
    console.log('data', data[1].manage_prices);
    if (error) console.log(error);
    return
  }
  fetchIdCartList()


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/download.json")}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title="No Order History" />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data, index) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={buttonPressHandler}
            >
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
  },
  LottieAnimation: {
    height: 250,
    // flex: 1,
    // height: "100%",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 30,
  },
  DownloadButton: {
    margin: 20,
    backgroundColor: COLORS.primaryButtonBlue,
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    borderRadius: 20,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
  },
});
