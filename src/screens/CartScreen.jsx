import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartIt from "../components/CartIt";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productsSlice } from "../store/states/products";

function CartScreen({ navigation, route }) {
  const productsList = useSelector((state)=> state.products.productsList)
  const productsList2 = useSelector((state)=> state.products.productsList2)
  const CartList = useSelector((state)=>state.products.CartList)
  const cartPrice = useSelector((state)=> state.products.CartPrice)
  const dispatch = useDispatch()

  const CartPrice = useSelector((state)=>state.products.CartPrice);
  const calcullateCartPrice = useStore((state) => state.calcullateCartPrice);
  const incrementCartItemQuantity = useStore(
    (state) => state.incrementCartItemQuantity
  );
  const decrementCartItemQuantity = useStore(
    (state) => state.decrementCartItemQuantity
  );
  // console.log("CartList = ", CartList.length);
  const tabBarHeight = useBottomTabBarHeight();

  function buttonPressHandler() {
    navigation.push("Payment");
  }

  useEffect(()=>{dispatch(productsSlice.actions.CACULATE_CART_PRICE())},[cartPrice])

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
                      const products = productsList.concat(productsList2)
                      const current_pr = products.find((item)=> item.id_pr = data.id_pr)
                      dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(current_pr))
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
