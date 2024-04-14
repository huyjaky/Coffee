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

function CartScreen({ navigation, route }) {
  const CartList = useStore((state) => state.CartList);
  const CartPrice = useStore((state) => state.CartPrice);
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
    navigation.push("Payment", { amount: CartPrice });
  }

  function incrementCartItemQuantityHandler(id, size) {
    incrementCartItemQuantity(id, size);
    calcullateCartPrice();
  }

  function decrementCartItemQuantityHandler(id, size) {
    decrementCartItemQuantity(id, size);
    calcullateCartPrice();
  }
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
                {CartList.map((data) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Details", {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}
                  >
                    <CartIt
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={{ price: CartPrice, currency: "$" }}
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
