import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import { COLORS } from "../theme/theme";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ["#fb923c", "#cbd5e1", "#10b981", "#a16207", "#f9a8d4"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require("../assets/get_started/c3.png"),
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: require("../assets/get_started/c4.png"),
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: require("../assets/get_started/c9.png"),
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: require("../assets/get_started/c6.png"),
  },
  {
    key: "3571604",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: require("../assets/get_started/c7.png"),
  },
];

function Indicator({ scrollX }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        // paddingTop: 500,
      }}
    >
      {DATA.map((data, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
}

function Backdrop({ scrollX }) {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((data, index) => index * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
}

function Square({ scrollX }) {
  const yolo = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = yolo.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
}

function GetStartedScreen() {
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center" }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.15, marginBottom: 10 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: 28,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#fff", fontWeight: "300" }}>
                  {item.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 0.15,
                  gap: 30,
                  //   marginBottom: 50,
                }}
              >
                <Pressable
                  onPress={() => {
                    navigation.push("Login");
                  }}
                  style={{
                    backgroundColor: "#e2e8f0",
                    borderRadius: 6,
                    padding: 15,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Log in
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    navigation.push("SignUp");
                  }}
                  style={{
                    backgroundColor: "#e2e8f0",
                    borderRadius: 6,
                    padding: 15,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Create account
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />

      <Indicator scrollX={scrollX} />
    </View>
  );
}

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
