import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import OrderItemCard from "./OrderItemCard";

function OrderHistoryCard({
  navigationHandler,
  CartList,
  CartListPrice,
  OrderDate,
}) {
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
      </View>
      <View style={styles.ListContainer}>
        {CartList.map((data, index) => (
          <TouchableOpacity
            key={index.toString() + data.id_pr}
            onPress={() => {
              navigationHandler();
            }}
          >
            <OrderItemCard
              item={data}
            />
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
    gap: 20,
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
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.primaryNovel,
  },
  PriceContainer: {
    alignItems: "flex-end",
  },
  ListContainer: {
    gap: 20,

  },
});
