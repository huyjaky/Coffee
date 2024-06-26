import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTFAMILY } from "../theme/theme";
import { AntDesign } from "@expo/vector-icons";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

function CoffeeCard({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.CardLinearGradientContainer}
      // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      // colors={["#f5dab5", "#d1c0ad"]}
      colors={["#f5dab5", "#b39c7f"]}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.CardImageBG}
        // source={imagelink_square}
        source={{ uri: imagelink_square }}
      >
        <View style={styles.CardRatingContainer}>
          <AntDesign name="star" size={16} color={"#230C02"} />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $<Text style={styles.CartPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{ ...price, quantity: 1 }],
            });
          }}
        >
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            // BGColor={COLORS.primaryOrangeHex}
            BGColor="#693a27"
            size={10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default CoffeeCard;

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: 15,
    borderRadius: 25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  CardRatingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 15,
    position: "absolute",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontWeight: "600",
    color: COLORS.primaryWhiteHex,
    // color: "#230C02",
    lineHeight: 22,
    fontSize: 14,
  },
  CardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  CardTitle: {
    fontWeight: "600",
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontSize: 16,
  },
  CardSubtitle: {
    fontWeight: "500",
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontSize: 10,
  },
  CardPriceCurrency: {
    fontWeight: "bold",
    color: COLORS.primaryOrangeHex,
    color: "#693a27",
    fontSize: 18,
  },
  CartPrice: {
    color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
});
