import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import ImageFavouriteBG from "./ImageFavouriteBG";
import { COLORS } from "../theme/theme";
import { useEffect, useState } from "react";
import { supabase } from "../store/supabase";

function FavoritesItemCard({ item }) {


  return (
    <View style={styles.CardContainer}>
      <ImageFavouriteBG
        item={item}
        EnableBackHandler={false}
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
