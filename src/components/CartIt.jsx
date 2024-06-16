import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";

function CartIt({
  id,
  name,
  imagelink_square,
  special_ingredient,
  prices,
}) {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const CartList = useSelector(state => state.products.CartList)


  async function addToCartDB(id_pr, prices_id, is_inscrease) {

    const {data, error} = await supabase.rpc('add_product_to_cart', {
      user_id_vr: user.user.id,
      id_pr_vr: id_pr,
      prices_id_vr: prices_id,
      is_inscrease: is_inscrease,
    })
    console.log('addToCartDb', error);
  }

  const [img, setImg] = useState();
  async function loadImg() {
    const { data, error } = await supabase.storage
      .from("Images")
      .getPublicUrl(imagelink_square);
    if (error) print(error);
    if (data) {
      setImg(data.publicUrl);
    }
  }

  useEffect(() => {
    loadImg();
  }, [imagelink_square]);

  useEffect(() => {
    console.log("img", img);
  }, [img]);

  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.CartItemLinearGradient}
        colors={COLORS.primaryBackgroundCard}
      >
        <View style={styles.CartItemRow}>

          <Image source={{uri: img ? img : ''}} style={styles.CartItemImage} />

          <View style={styles.CartItemInfo}>
            <View>
              <Text style={styles.CartItemTitle}>{name}</Text>
              <Text style={styles.CartItemSubtitle}>
                {special_ingredient}
              </Text>
            </View>
            {prices.map((data, index) => (
              <View style={styles.CartItemSizeRowContainer} key={index}>

                <View style={styles.CartItemSizeValueContainer}>
                  <Text style={styles.SizeCurrency}>
                    $
                    <Text style={styles.SizePrice}>{data.prices.price}</Text>
                  </Text>
                </View>

                <View style={styles.CartItemSizeValueContainer}>
                  <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={() => {
                      // decrementCartItemQuantityHandler(id, data.size);
                      dispatch(productsSlice.actions.DECREATEMENT_CART_ITEM_QUANTITY({prices: data.prices, id_pr: id}))
                      dispatch(productsSlice.actions.CACULATE_CART_PRICE())
                      addToCartDB(id, data.prices.prices_id, false)
                    }}
                  >
                    <Entypo
                      name="minus"
                      size={12}
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
                      // incrementCartItemQuantityHandler(id, data.size);
                      dispatch(productsSlice.actions.INCREATEMENT_CART_ITEM_QUANTITY({prices: data.prices, id_pr: id}))
                      dispatch(productsSlice.actions.CACULATE_CART_PRICE())
                      addToCartDB(id, data.prices.prices_id, true)
                    }}
                  >
                    <Entypo
                      name="plus"
                      size={12}
                      color={COLORS.primaryWhiteHex}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

      </LinearGradient>
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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,

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
    color: COLORS.primaryTitle,
  },
  CartItemSubtitle: {
    fontWeight: "800",
    fontSize: 12,
    color: COLORS.primaryTextBlue
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
    flexDirection: "column",
    justifyContent: "center",
  },
  CartItemSizeValueContainer: {
    width: '100%',
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
    color: COLORS.primaryTextBlue,
  },
  SizePrice: {
    color: COLORS.primaryGreyHex,
    fontSize: 18
  },
  CartItemIcon: {
    // backgroundColor: COLORS.primaryOrangeHex,
    backgroundColor: COLORS.primaryButtonGreen,
    padding: 12,
    borderRadius: 10,
  },
  CartItemQuantityContainer: {
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
    width: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryButtonBlue,
    alignItems: "center",
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryTextBlue,
    // color: "#230C02",
  }
});
