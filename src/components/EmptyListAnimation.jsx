import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../theme/theme";

function EmptyListAnimation({ title }) {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require("../lottie/pill.json")}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
}

export default EmptyListAnimation;

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: "center",
  },
  LottieStyle: {
    height: 300,
  },
  LottieText: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.primaryTextBlue,
    textAlign: "center",
  },
});
