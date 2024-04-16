import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import { useDispatch } from "react-redux";
import { productsSlice } from "../store/states/products";

function PaymentFooter({ price, buttonPressHandler, buttonTitle }) {
  const dispatch = useDispatch()
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          {price.currency} <Text style={styles.Price}>${price}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.PayButton} onPress={()=>{
        dispatch(productsSlice.actions.ADD_TO_CART())
      }}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PaymentFooter;

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  PriceContainer: {
    alignItems: "center",
    width: 100,
  },
  PriceTitle: {
    fontWeight: "600",
    fontSize: 14,
    // color: COLORS.secondaryLightGreyHex,
    color: COLORS.primaryTextBlue,
  },
  PriceText: {
    fontWeight: "bold",
    fontSize: 24,
    // color: COLORS.primaryOrangeHex,
    color: COLORS.primaryTextBlue,
  },
  Price: {
    // color: COLORS.primaryWhiteHex,
    color: COLORS.primaryTitle,
  },
  PayButton: {
    // backgroundColor: COLORS.primaryOrangeHex,
    backgroundColor: COLORS.primaryButtonBlue,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 72,
    borderRadius: 20,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: COLORS.primaryBackground,
  },
});
