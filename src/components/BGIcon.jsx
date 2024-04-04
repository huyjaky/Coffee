import { StyleSheet, View } from "react-native";
import CustomIcon from "./CustomIcon";
import { Ionicons } from "@expo/vector-icons";

function BGIcon({ name, color, size, BGColor }) {
  return (
    <View style={[styles.IconBG, { backgroundColor: BGColor }]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
