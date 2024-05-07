import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";

import { AntDesign } from "@expo/vector-icons";

function OrderItemCard({
  item
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
          <Image source={item.imagelink_square} style={styles.Image} />
          <View>
            <Text style={styles.CardTitle}>{item.name_pr}</Text>
            <Text style={styles.CardSubtitle}>{item.special_ingredient}</Text>
          </View>
        </View>
      </View>
      {item.manage_prices.map((data, index) => (
        <View
          key={index.toString()}
          style={styles.CardTableRow}
          onPress={() => { }}
        >
          <View style={styles.CardTableRow}>
            {/* <View style={styles.SizeBoxLeft}>
              <Text
                style={[
                  styles.SizeText,
                ]}
              >
                {data.quantity}
              </Text>
            </View> */}
            <Text>Quantity: {data.quantity}</Text>
            <Text>Price: {data.prices.price}</Text>
            {/* <View style={styles.CardIconMultiple}>
              <Text>
                <AntDesign name="close" size={20} color={"#230C02"} />
              </Text>
            </View> */}

            {/* <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrence}>
                $
                <Text style={styles.Price}>{data.prices.price}</Text>
              </Text>
            </View> */}
          </View>

          {/* <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              Total:
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              $ {(data.quantity * data.prices.price).toString()}
            </Text>
          </View> */}
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
    color: COLORS.primaryTitle,
  },
  CardSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    color:  COLORS.primaryTextBlue,
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
    backgroundColor: COLORS.primaryButtonBlueNavi,
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
    color: "#EEE",
  },
  PriceBoxRight: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryButtonGreen,
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
    fontSize: 20,
    color: COLORS.primaryNovel,
  },
  Price: {
    color: COLORS.primaryBackground,
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.primaryNovel,
  },

  CardIconMultiple: {}
});
