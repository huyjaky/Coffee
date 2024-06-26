import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../theme/theme";
import { Entypo } from "@expo/vector-icons";

function CartIt({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          colors={["#f5dab5", "#b39c7f"]}
          style={styles.CartItemLinearGradient}
        >
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.CartItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={styles.CartItemTitle}>{name}</Text>
                <Text style={styles.CartItemSubtitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.CartItemRoastedContainer}>
                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {prices.map((data, index) => (
            <View style={styles.CartItemSizeRowContainer} key={index}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize: type === "Bean" ? 12 : 16,
                      },
                    ]}
                  >
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}{" "}
                  <Text style={styles.SizePrice}>{data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}
                >
                  <Entypo
                    name="minus"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}
                >
                  <Entypo
                    name="plus"
                    size={10}
                    color={COLORS.primaryWhiteHex}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          colors={["#f5dab5", "#b39c7f"]}
          style={styles.CartItemSingleLinearGradient}
        >
          <View>
            <Image
              source={imagelink_square}
              style={styles.CartItemSingleImage}
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text style={styles.CartItemTitle}>{name}</Text>
              <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    { fontSize: type === "Bean" ? 12 : 16 },
                  ]}
                >
                  {prices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {prices[0].currency}{" "}
                <Text style={styles.SizePrice}>{prices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <Entypo name="minus" size={10} color={COLORS.primaryWhiteHex} />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {prices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, prices[0].size);
                }}
              >
                <Entypo name="plus" size={10} color={COLORS.primaryWhiteHex} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
}

export default CartIt;

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 25,
  },
  CartItemRow: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  CartItemTitle: {
    fontWeight: "600",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CartItemSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.primaryDarkGreyHex,
    backgroundColor: "#693a27",
  },
  CartItemRoastedText: {
    fontWeight: "800",
    fontSize: 10,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizeBox: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#693a27",
    height: 40,
    width: 90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeText: {
    fontWeight: "600",
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryOrangeHex,
    color: "#693a27",
  },
  SizePrice: {
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  CartItemIcon: {
    // backgroundColor: COLORS.primaryOrangeHex,
    backgroundColor: "#693a27",
    padding: 12,
    borderRadius: 10,
  },
  CartItemQuantityContainer: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#693a27",
    width: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    // color: "#230C02",
  },
  CartItemSingleLinearGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  CartItemSingleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
