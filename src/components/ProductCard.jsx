import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

function CoffeeCard({
  id,
  index,
  type,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
}) {
  const dispatch = useDispatch()
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.CardLinearGradientContainer}
      // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      // colors={["#f5dab5", "#d1c0ad"]}
      colors={COLORS.primaryBackgroundCard}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.CardImageBG}
        source={require('../assets/coffee_assets/excelsa_coffee_beans/excelsa_coffee_beans_square.png')}
      >
        <View style={styles.CardRatingContainer}>
          <AntDesign name="star" size={16} color={COLORS.primaryIconYellow} />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $<Text style={styles.CartPrice}>{price.prices.price}</Text>
          {/* $<Text style={styles.CartPrice}>15</Text> */}
        </Text>
        <TouchableOpacity

          onPress={() => {
            console.log(price);
            dispatch(productsSlice.actions.ADD_TO_CART({
              id,
              index,
              type,
              imagelink_square,
              name,
              special_ingredient,
              average_rating,
              manage_prices: [{...price, quantity: 1}]
            }))
          }}
        >
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            // BGColor={COLORS.primaryOrangeHex}
            BGColor={COLORS.primaryButtonGreen}
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
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,

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
    color: COLORS.primaryTitle,
    fontSize: 16,
  },
  CardSubtitle: {
    fontWeight: "500",
    color: COLORS.primaryTextBlue,
    fontSize: 10,
  },
  CardPriceCurrency: {
    fontWeight: "bold",
    color: COLORS.primaryTitle,
    fontSize: 20,
  },
  CartPrice: {
    color: COLORS.primaryTitle
  },
});
