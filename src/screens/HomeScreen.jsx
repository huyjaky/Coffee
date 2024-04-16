import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, FONTFAMILY } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import supabase from "../store/supabase";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/states/products";

function getCategoriesFromData(data1, data2) {
  const data = data1.concat(data2)
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].type_pr] == undefined) {
      temp[data[i].type_pr] = 1;
    } else {
      temp[data[i].type_pr]++;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].derived] == undefined) {
      temp[data[i].derived] = 1;
    } else {
      temp[data[i].derived]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

function getProductList(category, data1, data2) {
  const data = data1.concat(data2)
  if (category == "All") {
    return data;
  } else {
    let productsList = data.filter((item) => item.type_pr == category);
    if (productsList.length == 0) productsList = data.filter((item) => item.derived == category)
    return productsList;
  }
}


function HomeScreen({ navigation }) {
  const productsList = useSelector((state) => state.products.productsList)
  const productsList2 = useSelector((state) => state.products.productsList2)
  const FavoritesList = useSelector((state) => state.products.FavoritesList)
  const dispatch = useDispatch()


  const ListRef = useRef();

  const CoffeeList = useStore((state) => state.CoffeeList);

  // console.log(BeanList);
  const [searchText, setSearchText] = useState("");
  const [categories, setCatehories] = useState(
    getCategoriesFromData(productsList, productsList2)
  );

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedProducts, setsortedProducts] = useState(
    getProductList(categoryIndex.category, productsList, productsList2)
  );

  
  useEffect(() => {
    setsortedProducts(
      getProductList(categoryIndex.category, productsList, productsList2)
    )
  }, [FavoritesList, productsList, productsList2])

  useEffect(()=>{},[sortedProducts])

  // console.log("sortedProducts = ", sortedProducts.length);

  function searchCoffee(search) {
    if (search !== "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setsortedProducts([
        ...CoffeeList?.filter((item) =>
          item?.name?.toLowerCase()?.includes(search?.toLowerCase())
        ),
      ]);
    }
  }

  function resetSearchCoffee() {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setsortedProducts([...CoffeeList]);
    setSearchText("");
  }

  useEffect(() => { }, [productsList, productsList2])

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar title="Home Screens" />

        <Text style={styles.ScreenTitle}>
          Find the best{"\n"}coffee for you
        </Text>

        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <Ionicons
            style={styles.InputIcon}
            name="search"
            size={18}
            color={
              searchText.length > 0
                ? COLORS.primaryTextBlue
                : COLORS.primaryWhiteHex
            }
          />
          <TextInput
            placeholder="Find Your Coffee..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryWhiteHex}
            style={styles.TextInputContainer}
          />
          {searchText?.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchCoffee();
              }}
            >
              <Ionicons
                style={styles.InputIcon}
                name="close"
                size={16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories?.map((data, index) => (
            <View key={index} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setsortedProducts([
                    ...getProductList(categories[index], productsList, productsList2),
                  ]);
                }}
                style={styles.CategoryScrollViewItem}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex?.index == index
                      ? { color: COLORS.primaryTextBlue }
                      : { color: COLORS.primaryTitle },
                    // : { color: COLORS.secondaryLightGreyHex },
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex?.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Products Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedProducts}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item?.id_pr}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(item))
                  navigation.push("Details");
                }}
              >
                <ProductCard item={item} />
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.DrugTitle}>Coffee </Text>
        {/* Beans FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Products Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={productsList2}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item?.id_pr}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(item))
                  navigation.push("Details");
                }}
              >
                <ProductCard item={item} />
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.CoffeBeansTitle}>Text</Text>
        {/* Beans FlatList */}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: 28,
    // color: COLORS.primaryWhiteHex,
    color: COLORS.primaryTitle,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primaryTitle,
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flex: 1,
    height: 60,
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: 20,
    // backgroundColor: "red",
    borderRadius: 20,
  },
  CategoryScrollViewItem: {
    alignItems: "center",
    borderRadius: 20,
  },
  ActiveCategory: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryTextBlue,
  },
  CategoryText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: 4,
  },
  FlatListContainer: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  DrugTitle: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 20,
    fontWeight: "600",
    color: COLORS.primaryTextBlue
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36 * 3.6,
  },
  CoffeBeansTitle: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 70,
    fontWeight: "600",
    color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
  },
});
