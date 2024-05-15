import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import BGIcon from "./BGIcon";
import { supabase } from "../store/supabase";

const CARD_WIDTH = Dimensions.get("window").width * 0.36;

function ManageCard({
  item
}) {
  const CartList = useSelector(state => state.products.CartList)
  const user = useSelector(state => state.user.user)


  async function addToCartDB(id_pr, prices_id) {
    // console.log({
    //   user_id_vr: user.user.id,
    //   id_pr_vr: id_pr,
    //   prices_id_vr: prices_id
    // });
    const { data, error } = await supabase.rpc('add_product_to_cart', {
      user_id_vr: user.user.id,
      id_pr_vr: id_pr,
      prices_id_vr: prices_id,
      is_inscrease: true
    })
    console.log('addToCartDb product cart', error);
  }


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
          <Text style={styles.CardRatingText}>{item.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{item.name_pr}</Text>
      {/* <Text style={styles.CardSubtitle}>{item.special_ingredient}</Text> */}
      <View style={styles.CardFooterRow}>
        <BGIcon
          color={COLORS.primaryWhiteHex}
          name="add"
          // BGColor={COLORS.primaryOrangeHex}
          BGColor={COLORS.primaryButtonGreen}
          size={10}
        />
        <BGIcon
          color={COLORS.primaryWhiteHex}
          name="delete"
          // BGColor={COLORS.primaryOrangeHex}
          BGColor={COLORS.primaryButtonGreen}
          size={10}
        />
        <BGIcon
          color={COLORS.primaryWhiteHex}
          name="add"
          // BGColor={COLORS.primaryOrangeHex}
          BGColor={COLORS.primaryButtonGreen}
          size={10}
        />
      </View>
    </LinearGradient>
  );
}

export default ManageCard;

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: 15,
    borderRadius: 20,
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
    textAlign: 'center'
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
