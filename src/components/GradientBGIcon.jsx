import { Pressable, StyleSheet, Touchable, View } from "react-native";
import { COLORS, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
// function test1() {
//   useEffect(function () {
//     getCoffee().then((data) => console.log(data));
//   }, []);
// }

function GradientBGIcon({ name, color, size }) {


  return (
    <Pressable style={styles.Container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        colors={COLORS.primaryBackgroundCard}
        style={styles.LinearGradient}
      >
        <CustomIcon name={name} color={color} size={size} />
      </LinearGradient>
    </Pressable>
  );
}
export default GradientBGIcon;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    // borderColor: COLORS.secondaryDarkGreyHex,
    borderColor: "#afa08e",
    borderRadius: SPACING.space_12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: "hidden",
  },
  LinearGradient: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: "center",
    justifyContent: "center",
  },
});
