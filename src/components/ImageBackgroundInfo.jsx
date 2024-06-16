import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import { useEffect, useState } from "react";
import { supabase } from "../store/supabase";

function ImageBackgroundInfo({
  item,
  EnableBackHandler,
  BackHandler,
}) {

  const FavoritesList = useSelector((state) => state.products.FavoritesList);
  const item2 = useSelector((state) => state.products.currentDetailCart)
  const [isFavor, setIsFavor] = useState(item.favourite)
  const dispatch = useDispatch()

  const [img, setImg] = useState();

  async function alterTable() {
    const { error } = await supabase.from('products').update({ favourite: !isFavor }).eq('id_pr', item.id_pr)
    console.log(error);
  }

  function toggleFavor() {
    // update in db
    setIsFavor(!isFavor)
    dispatch(productsSlice.actions.TOGGLE_FAVORITE(item))
    alterTable()
  }


  async function loadImg() {
    const { data, error } = await supabase.storage
      .from("Images")
      .getPublicUrl(item.imagelink_square);
    if (error) print(error);
    if (data) {
      setImg(data.publicUrl);
    }
  }

  useEffect(() => {
    loadImg()
  }, [])


  return (
    <View>
      <ImageBackground 
        source={{uri: img ? img : ''}}
        style={styles.ItemBackgroundImage}
      >
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}
            >
              <AntDesign
                name="arrowleft"
                color={COLORS.primaryLightGreyHex}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleFavor()
              }}
            >
              <AntDesign
                name="heart"
                color={
                  isFavor ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={30}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBarContainerWithoutBack}>
            <TouchableHighlight
              onPress={() => {
                toggleFavor()
              }} >
              <View>
                <AntDesign
                  name="heart"
                  color={isFavor ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                  size={30}
                />
              </View>
            </TouchableHighlight>
          </View>
        )}

        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={[styles.ItemTitleText,]} >
                  {item.name_pr}
                </Text>
                <Text
                  style={[styles.ItemSubtitleText,]}
                >
                  {item.derived}
                </Text>
              </View>
              
            </View>
            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <AntDesign
                  name="star"
                  size={20}
                  color={COLORS.primaryOrangeHex}
                // color="#693a27"
                />
                <Text
                  style={[
                    styles.RatingText,
                    { color: item.type_pr === "Bean" ? "#d25018" : "#230C02" },
                  ]}
                >
                  {item.average_rating}
                </Text>
                <Text
                  style={[
                    styles.RatingCountText,
                    { color: item.type_pr === "Bean" ? "#d25018" : "#230C02" },
                  ]}
                >
                  ({item.ratings_count})
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithBack: {
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ImageInfoOuterContainer: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primaryWhiteRGBA,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  ImageInfoInnerContainer: {
    justifyContent: "space-between",
    gap: 15,
  },
  InfoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ItemTitleText: {
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.primaryTitle,
  },
  ItemSubtitleText: {
    fontWeight: "600",
    fontSize: 12,
    color: COLORS.primaryTextBlue,
  },
  ItemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  ProperFirst: {
    height: 55,
    width: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryButtonGreen,
  },
  PropertyTextFirst: {
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.primaryBackground,
  },
  PropertyTextLast: {
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.primaryBackground,
    marginTop: 8,
  },
  RatingContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  RatingText: {
    fontWeight: "bold",
    fontSize: 18,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  RatingCountText: {
    fontWeight: "800",
    fontSize: 12,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
  RoastedContainer: {
    height: 55,
    width: 130,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBackground,
  },
  RoastedText: {
    fontWeight: "800",
    fontSize: 10,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
});
