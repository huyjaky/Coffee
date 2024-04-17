import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavoritesItemCard from "../components/FavoritesItemCard";
import HeaderBar from "../components/HeaderBar";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";

function FavoritesScreen({ navigation }) {
  const FavoritesList = useSelector((state) => state.products.FavoritesList);
  const dispatch = useDispatch()

  const tabBarHeight = useBottomTabBarHeight();


  useEffect(()=>{},[FavoritesList])
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favourites" />

            {FavoritesList?.length === 0 ? (
              <EmptyListAnimation title="No favourites" />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList?.map((data, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(data))
                      navigation.push("Details");
                    }}
                    key={index}
                  >
                    <FavoritesItemCard
                      item={data}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
});
