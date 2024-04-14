import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";

function OrderItemCard({
  type,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  ItemPrice,
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      colors={COLORS.primaryBackgroundCard}
      style={styles.CardLinearGradient}
    >
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={imagelink_square} style={styles.Image} />
          <View>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
          </View>
        </View>
      </View>
      {prices.map((data, index) => (
        <View
          key={index.toString()}
          style={styles.CardTableRow}
          onPress={() => {
            navigationH;
          }}
        >
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text
                style={[
                  styles.SizeText,
                  { fontSize: type === "Bean" ? 12 : 14 },
                ]}
              >
                {data.quantity}
              </Text>
            </View>
            <View style={styles.CardIconMultiple}>
              <Text>
                X
              </Text>
            </View>

            <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrence}>
                {data.currency}
                <Text style={styles.Price}>{data.price}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              Total:
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              $ {(data.quantity * data.price).toFixed(2).toString()}
            </Text>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
}

export default OrderItemCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: 20,
    padding: 20,
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

  },
  CardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CardImageInfoContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  CardTitle: {
    fontWeight: "600",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CardSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.secondaryLightGreyHex,
    color: "#693a27",
  },
  CardCurrency: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#693a27",
  },
  CardPrice: {
    color: "#693a27",
    // color: "#230C02",
  },
  CardTableRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBoxLeft: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#98634e",
    height: 45,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // borderRightWidth: 1,
    borderRightColor: COLORS.primaryGreyHex,
  },
  SizeText: {
    fontWeight: "600",
    color: "#230C02",
  },
  PriceBoxRight: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#f6ddd3",
    height: 45,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: COLORS.primaryGreyHex,
  },
  PriceCurrence: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#693a27",
  },
  Price: {
    color: "#88310c",
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#693a27",
  },

  CardIconMultiple: {}
});
