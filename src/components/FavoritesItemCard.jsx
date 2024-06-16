import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import ImageFavouriteBG from "./ImageFavouriteBG";
import { COLORS } from "../theme/theme";
import { useEffect, useState } from "react";

function FavoritesItemCard({ item }) {

  const [img, setImg] = useState();
  async function loadImg() {
    if (!item) return
    const { data, error } = await supabase.storage
      .from("Images")
      .getPublicUrl(item.imagelink_square);
    if (error) print(error);
    if (data) {
      setImg(data.publicUrl);
      item.imagelink_square = data.publicUrl;
      console.log(data.publicUrl);
    }
  }

  useEffect(()=>{
      loadImg()
  },[item])

  useEffect(()=>{
    console.log(img);
  },[img])

  return (
    <View style={styles.CardContainer}>
      <ImageFavouriteBG
        item={item}
        EnableBackHandler={false}
        source={{
          uri: img
            ? img
            : "https://aidmhlapqfrmwtpnmmbd.supabase.co/storage/v1/object/public/Images/b71105f8-6873-4aa2-afdf-0941c8f76418/1717065228272.png",
        }}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#b8d8e0", COLORS.primaryBackground]}
        style={styles.ContainerLinearGradient}
      ></LinearGradient>
    </View>
  );
}

export default FavoritesItemCard;

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  ContainerLinearGradient: {
    gap: 10,
    padding: 20,
  },
  DescriptionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    // color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
    letterSpacing: 3,
  },
  DescriptionText: {
    fontWeight: "800",
    fontSize: 14,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
  },
});
