import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartIt from "../components/CartIt";
import EmptyListAnimation from "../components/EmptyListAnimation";
import HeaderBar from "../components/HeaderBar";
import PaymentFooter from "../components/PaymentFooter";
import { productsSlice } from "../store/states/products";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";

function CartScreen({ navigation, route }) {
  const productsList = useSelector((state) => state.products.productsList)
  const productsList2 = useSelector((state) => state.products.productsList2)
  const CartList = useSelector((state) => state.products.CartList)
  const cartPrice = useSelector((state) => state.products.CartPrice)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const CartPrice = useSelector((state) => state.products.CartPrice);
  // console.log("CartList = ", CartList.length);
  const tabBarHeight = useBottomTabBarHeight();

  function buttonPressHandler() {
    navigation.push("Payment");
  }

  useEffect(()=>{}, [CartList])
  useEffect(() => { dispatch(productsSlice.actions.CACULATE_CART_PRICE()) }, [CartList])

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />

            {CartList.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList?.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(data))
                      navigation.push("Details");
                    }}
                    key={data.id_pr}
                  >
                    <CartIt
                      id={data.id_pr}
                      name={data.name_pr}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      prices={data.manage_prices}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={CartPrice}
              buttonPressHandler={buttonPressHandler}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
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
    gap: 20,
  },
});
