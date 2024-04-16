import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import CartIt from "../components/CartIt";
import FavoritesItemCard from "../components/FavoritesItemCard";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";
import { useEffect } from "react";

function FavoritesScreen({ navigation }) {
  const FavoritesList = useSelector((state) => state.products.FavoritesList);
  const dispatch = useDispatch()
  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList
  );
  const tabBarHeight = useBottomTabBarHeight();
  function ToggleFavourite(favourite, type, id) {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  }

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
                      ToggleFavouriteItem={ToggleFavourite}
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
