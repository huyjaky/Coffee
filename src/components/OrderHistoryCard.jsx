import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import OrderItemCard from "./OrderItemCard";
import { useDispatch } from "react-redux";
import { productsSlice } from "../store/states/products";

function OrderHistoryCard({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
  openModal,
  order
}) {
  const dispatch = useDispatch()
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardHeader}>
        <View>
          <Text style={styles.HeaderTitle}>Order Time</Text>
          <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
        </View>
        <View style={styles.PriceContainer}>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderPrice}>${CartListPrice}</Text>
        </View>
        <View style={styles.ViewOrderButton}>
          <TouchableOpacity onPress={() => openModal(order)}>
            <Text
              style={styles.ViewOrderBtnText}>
              View Status
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {CartList.map((data, index) => (
          <TouchableOpacity
            key={index.toString() + data.id_pr}
            onPress={() => {
              dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(data))
              navigationHandler();
            }}
          >
            {/* <OrderItemCard
              item={data}
            /> */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default OrderHistoryCard;

const styles = StyleSheet.create({
  CardContainer: {
    gap: 10,
  },
  CardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  HeaderTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryNovel,
  },
  HeaderSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: COLORS.primaryNovel,
  },
  HeaderPrice: {
    textAlign: 'center',
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.primaryNovel,
  },
  ViewOrderButton: {
    height: 40,
    width: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryButtonGreen,
  },
  ViewOrderBtnText: {
    textAlign: 'center',
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.primaryBackground,
  },
  PriceContainer: {
    alignItems: "center",
  },
  ListContainer: {
    gap: 20,

  },
});
