import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import HeaderBar from "../components/HeaderBar";
import ProductCard from "../components/ProductCard";
import { productsSlice } from "../store/states/products";
import { userSlice } from "../store/states/user";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";
import LoadingSceen from "./LoadingScreen";

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
  const data = data1.concat(data2)
  if (category == "All") {
    return data;
  } else {
    if (category === 'medical equipment' || category === 'medicine') {
      let productsList = data.filter((item) => item.category_pr === category);
      return productsList;
    } else {
      let productsList = data.filter((item) => item.derived == category)
      if (productsList.length == 0) productsList = data.filter((item) => item.type_pr === category)
      return productsList
    }
  }
}


function HomeScreen({ navigation }) {
  const productsList = useSelector((state) => state.products.productsList)
  const productsList2 = useSelector((state) => state.products.productsList2)
  const FavoritesList = useSelector((state) => state.products.FavoritesList)
  const [isLoading, setIsLoading] = useState({
    get_user: false,
    get_cart_list: false,
    get_order_history: false
  })
  const dispatch = useDispatch()


  const ListRef = useRef();

  const [productAll, setProductAll] = useState(productsList.concat(productsList2));

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

  function searchCoffee() {
    if (searchText === '') {
      setsortedProducts(
        getProductList(categoryIndex.category, productsList, productsList2)
      )
      return
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

  // initially update user
  const [session, setSession] = useState(null)
  const user = useSelector(state => state.user.user)

  async function fetchExtra() {
    if (session?.access_token) {
      // console.log(session.user.id); dot user is must step to call id inside session
      const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).then((data) => {
        console.log('user',session.user.id);

        if (!error && data.data) dispatch(userSlice.actions.UPDATE_CURRENT_USER({
          ...session,
          first_name: data.data[0].first_name,
          last_name: data.data[0].last_name,
          role: data.data[0].role
        }))
        setIsLoading({ ...isLoading, get_user: true })
      })

    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    fetchExtra()
  }, [session])
  //---------------------------------------------------------------



  async function fetchCartList() {
    const { data, error } = await supabase.rpc('get_cart_list', {
      user_id_vr: user.user.id
    }).then((data) => {
      dispatch(productsSlice.actions.UPDATE_CARTLIST(data.data.order_history_products))
      setIsLoading({ ...isLoading, get_cart_list: true })
    })
  }


  async function fetchOrderHistory() {
    const { data, error } = await supabase.rpc('get_order_history', {
      user_id_vr: user.user.id
    }).then((data) => {
      // console.log(data.order_history[0].CartList[0]);
      if (data.data.order_history.length == 0) return
      dispatch(productsSlice.actions.UPDATE_ORDER_HISTORY_LIST_FROM_CART(data.data.order_history))
      setIsLoading({ ...isLoading, get_order_history: true })
    })
  }

  useEffect(() => {
    fetchCartList()
    fetchOrderHistory()
  }, [user])


  useEffect(() => {
    setsortedProducts(
      getProductList(categoryIndex.category, productsList, productsList2)
    )
    setProductAll(productsList.concat(productsList2))
  }, [FavoritesList, productsList, productsList2])

  useEffect(() => { }, [sortedProducts])
  useEffect(() => {
    searchCoffee()
  }, [productAll, searchText])

  useEffect(()=>{}, [isLoading])

  if (isLoading.get_cart_list && isLoading.get_order_history && isLoading.get_user) {
    return (
      <LoadingSceen />
    )
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
          An easy way{"\n"}To find your med!
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
          keyExtractor={item => uuidv4()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={uuidv4()}
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

        <Text style={styles.DrugTitle}>Medicine </Text>
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
          keyExtractor={item => uuidv4()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={uuidv4()}
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

        <Text style={styles.CoffeBeansTitle}></Text>
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
