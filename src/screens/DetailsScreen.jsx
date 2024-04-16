import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useStore } from "../store/store";
import { COLORS } from "../theme/theme";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import { useEffect, useState } from "react";
import PaymentFooter from "../components/PaymentFooter";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";

function DetailsScreen({ navigation, route }) {
  // console.log("route = ", route.params);
  const ItemofIndex = useSelector((state) => state.products.currentDetailCart);
  const dispatch = useDispatch()
  useEffect(()=>{}, [ItemofIndex])

  const addToFavoriteList = useStore((state) => state.addToFavoriteList);

  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList
  );

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemofIndex.manage_prices[0]);

  function ToggleFavourite(favourite, type, id) {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }

  function BackHandler() {
    navigation.pop();
  }


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          item={ItemofIndex}
          ToggleFavourite={ToggleFavourite}
          BackHandler={BackHandler}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText}>
                {ItemofIndex.des}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText} numberOfLines={3}>
                {ItemofIndex.des}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemofIndex.manage_prices.map((data) => (
              <TouchableOpacity
                onPress={() => {
                  setPrice(data);
                }}
                key={data.prices.size}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.prices.size === price.prices.size
                        ? COLORS.primaryButtonBlue
                        : // : COLORS.primaryDarkGreyHex,
                        "#fbd09c99",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: ItemofIndex.type_pr === "Bean" ? 14 : 16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryButtonBlue
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}
                >
                  {data.prices.size}{data.prices.unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price.prices.price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            const temp = { ...ItemofIndex, manage_prices: [{ prices: { ...price.prices }, quantity: 1 }] }
            dispatch(productsSlice.actions.ADD_TO_CART(temp))
            dispatch(productsSlice.actions.CACULATE_CART_PRICE())
            BackHandler()
          }}
        />
      </ScrollView>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea: {
    padding: 20,
  },
  InfoTitle: {
    fontWeight: "bold",
    letterSpacing: 3,
    fontSize: 16,
    // color: COLORS.primaryLightGreyHex,
    color: "#230C02",
    marginBottom: 10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontWeight: "800",
    fontSize: 14,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
    marginBottom: 30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    // backgroundColor: COLORS.primaryDarkGreyHex,
    backgroundColor: COLORS.primaryBackgroundCard,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
  },
  SizeText: {
    fontWeight: "600",
  },
});
