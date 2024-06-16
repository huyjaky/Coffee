import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ProductCard from "../components/ProductCard";
import { productsSlice } from "../store/states/products";
import { COLORS } from "../theme/theme";
import { Actionsheet, Box, useDisclose } from "native-base";
import ManageCard from "../components/ProductManageCard";
import { supabase } from "../store/supabase";

function getCategoriesFromData(data1, data2) {
  const data = data1.concat(data2);
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

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].category_pr] == undefined) {
      temp[data[i].category_pr] = 1;
    } else {
      temp[data[i].category_pr]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

function getProductList(category, data1, data2) {
  const data = data1.concat(data2);
  if (category == "All") {
    return data;
  } else {
    if (category === "medical equipment" || category === "medicine") {
      let productsList = data.filter((item) => item.category_pr == category);
      return productsList;
    } else {
      let productsList = data.filter((item) => item.derived == category);
      if (productsList.length == 0)
        productsList = data.filter((item) => item.type_pr == category);
      return productsList;
    }
  }
}

function ManageProductScreen({ navigation, isUpdate }) {
  // Define state for managing products
  const { isOpen, onOpen, onClose } = useDisclose();
  const [searchText, setSearchText] = useState("");
  const productsList = useSelector((state) => state.products.productsList);
  const productsList2 = useSelector((state) => state.products.productsList2);
  const dispatch = useDispatch();
  const [productAll, setProductAll] = useState(
    productsList.concat(productsList2)
  );
  const user = useSelector((state) => state.user.user);
  const [item, setItem] = useState();
  const [products, setProducts] = useState(
    productsList
      .concat(productsList2)
      .filter((item) => item.owned_id === user.user.id)
  );
  const [categories, setCatehories] = useState(
    getCategoriesFromData(productsList, productsList2)
  );
  const ListRef = useRef();
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedProducts, setsortedProducts] = useState(
    getProductList(categoryIndex.category, productsList, productsList2)
  );

  function searchCoffee() {
    if (searchText === "") {
      setsortedProducts(
        getProductList(categoryIndex.category, productsList, productsList2)
      );
      return;
    }

    if (searchText !== "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setsortedProducts([
        ...productAll?.filter((item) =>
          item?.name_pr?.toLowerCase()?.includes(searchText?.toLowerCase())
        ),
      ]);
    }
  }
  function resetSearch() {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setsortedProducts([...productAll]);
    setSearchText("");
  }

  useEffect(() => {
    searchCoffee();
  }, [productAll, searchText]);

  useEffect(() => {
    setsortedProducts(productsList.concat(productsList2));
  }, [productsList, productsList2]);

  useEffect(() => {}, [sortedProducts]);

  async function deleteProduct() {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id_pr", item.id_pr);
    if (error) print(error);
  }

  async function deletePr() {
    deleteProduct();
    console.log(item);
    if (item.category_pr === "medicine") {
      dispatch(productsSlice.actions.REMOVE_PRODUCTS2(item?.id_pr));
    } else if (item.category_pr === "medical equipment") {
      dispatch(productsSlice.actions.REMOVE_PRODUCTS(item?.id_pr));
    }
  }

  return (
    <View style={styles.viewContainer}>
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
          placeholder="Find Product..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          placeholderTextColor={COLORS.primaryWhiteHex}
          style={styles.TextInputContainer}
        />
        {searchText?.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              resetSearch();
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
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories?.map((data, index) => (
            <View key={uuidv4()} style={styles.CategoryScrollViewContainer}>
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
                    ...getProductList(
                      categories[index],
                      productsList,
                      productsList2
                    ),
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
      </View>

      {/* Display product */}
      <FlatList
        ref={ListRef}
        numColumns={2}
        data={sortedProducts}
        columnWrapperStyle={{ gap: 20, paddingHorizontal: 15 }}
        contentContainerStyle={{ gap: 10, paddingVertical: 20 }}
        keyExtractor={(item, index) => item.name + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          // return <ManageCard item={item} />;
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(item)
                  );
                  navigation.push("Details");
                }}
                onLongPress={() => {
                  onOpen();
                  setItem(item);
                }}
                delayLongPress={500}
              >
                <ProductCard item={item} isManage={true} />
              </TouchableOpacity>
            </>
          );
        }}
      />
      {/* form */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              dispatch(productsSlice.actions.UPDATE_CURRENT_DETAIL_CART(item));
            }}
          >
            Edit
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              deletePr();
              onClose()
            }}
          >
            Delete
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}

export default ManageProductScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 20,
  },
  productItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: COLORS.primaryButtonGreen,
    flex: 1,
    height: 200,
    borderRadius: 10,
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
  CRUDmenu: {
    zIndex: 1,
    position: "absolute",
    top: 10,
    right: 5,
  },
  productText: {
    color: COLORS.primaryNovel,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: 28,
    color: COLORS.primaryTitle,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  categoryContainer: {
    height: 80, // Fixed height for the category container
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: 20,
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
    color: COLORS.primaryTextBlue,
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
    color: "#230C02",
  },
});
