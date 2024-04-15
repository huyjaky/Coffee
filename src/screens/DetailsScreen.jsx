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
import { useState } from "react";
import PaymentFooter from "../components/PaymentFooter";

function DetailsScreen({ navigation, route }) {
  // console.log("route = ", route.params);
  const ItemofIndex = useStore((state) =>
    route.params.type === "Coffee" ? state.CoffeeList : state.BeanList
  )[route.params.index];

  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const addToCart = useStore((state) => state.addToCart);
  const calcullateCartPrice = useStore((state) => state.calcullateCartPrice);
  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList
  );

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemofIndex.prices[0]);

  function ToggleFavourite(favourite, type, id) {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }

  function BackHandler() {
    navigation.pop();
  }

  function addToCartHandler({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }) {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calcullateCartPrice();
    navigation.navigate("Cart");
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
          imagelink_portrait={ItemofIndex.imagelink_portrait}
          type={ItemofIndex.type}
          id={ItemofIndex.id}
          favourite={ItemofIndex.favourite}
          name={ItemofIndex.name}
          special_ingredient={ItemofIndex.special_ingredient}
          ingredients={ItemofIndex.ingredients}
          average_rating={ItemofIndex.average_rating}
          ratings_count={ItemofIndex.ratings_count}
          roasted={ItemofIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
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
                {ItemofIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Text style={styles.DescriptionText} numberOfLines={3}>
                {ItemofIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemofIndex.prices.map((data) => (
              <TouchableOpacity
                onPress={() => {
                  setPrice(data);
                }}
                key={data.size}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryButtonBlue
                        : COLORS.primaryNovel,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: ItemofIndex.type === "Bean" ? 14 : 16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryButtonBlue
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCartHandler({
              id: ItemofIndex.id,
              index: ItemofIndex.index,
              name: ItemofIndex.name,
              roasted: ItemofIndex.roasted,
              imagelink_square: ItemofIndex.imagelink_square,
              special_ingredient: ItemofIndex.special_ingredient,
              type: ItemofIndex.type,
              price: price,
            });
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
