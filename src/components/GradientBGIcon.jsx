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

function GradientBGIcon({ name, color, size, style }) {


  return (
    <Pressable style={styles.Container}>
        <CustomIcon name={name} color={color} size={size} style={style} />
    </Pressable>
  );
}
export default GradientBGIcon;

const styles = StyleSheet.create({
  Container: {
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryButtonBlue,
  },
});
