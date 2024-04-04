import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/theme";

import { FontAwesome6 } from "@expo/vector-icons";

function PaymentMethod({ paymentMode, name, icon, isIcon }) {
  return (
    <View
      style={[
        styles.PaymentCardContainer,
        {
          borderColor:
            paymentMode === name ? COLORS.primaryOrangeHex : "#FFF5E9",
        },
      ]}
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#89765b", "#cba06cfa"]}
          style={styles.LinearGradientWallet}
        >
          <View style={styles.WalletRow}>
            <FontAwesome6
              name="wallet"
              size={28}
              color={COLORS.primaryOrangeHex}
            />
            <Text style={styles.PaymentTitle}>{name}</Text>
          </View>
          <Text style={styles.PaymentPrice}>$100.000</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          colors={["#89765b", "#cba06cfa"]}
          style={styles.LinearGradientRegular}
        >
          <Image source={icon} style={styles.PaymentImage} />
          <Text style={styles.PaymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
}

export default PaymentMethod;

const styles = StyleSheet.create({
  PaymentCardContainer: {
    borderRadius: 30,
    backgroundColor: "#FFF5E9",
    borderWidth: 3,
  },
  LinearGradientWallet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 27,
  },
  PaymentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  PaymentPrice: {
    fontWeight: "800",
    fontSize: 16,
    // color: COLORS.secondaryLightGreyHex,
    color: "#693a27",
  },
  LinearGradientRegular: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 30,
  },
  PaymentImage: {
    height: 30,
    width: 30,
  },
});
