import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import ImageBackgroundInfo from "./ImageBackgroundInfo";

function FavoritesItemCard({
  item,
  ToggleFavouriteItem,
}) {
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        item={item}
        EnableBackHandler={false}
        ToggleFavourite={ToggleFavouriteItem}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        colors={["#f5dab5", "#b39c7f"]}
        style={styles.ContainerLinearGradient}
      >
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{item.des}</Text>
      </LinearGradient>
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
