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
            key={index.toString() + data.id}
            onPress={() => {
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              });
            }}
          >
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              ItemPrice={data.ItemPrice}
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
    color: COLORS.primaryWhiteHex,
    color: "#693a27",
  },
  HeaderSubtitle: {
    fontWeight: "400",
    fontSize: 13,
    color: COLORS.primaryOrangeHex,
  },
  HeaderPrice: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.primaryOrangeHex,
  },
  PriceContainer: {
    alignItems: "flex-end",
  },
  ListContainer: {
    gap: 20,
  },
});
