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
import CoffeeCard from "../components/CoffeeCard";
import { getCoffee } from "../store/apiCoffee";
import supabase from "../store/supabase";

function getCategoriesFromData(data) {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

function getCoffeeList(category, data) {
  if (category == "All") {
    return data;
  } else {
    let coffeelist = data.filter((item) => item.name == category);
    return coffeelist;
  }
}

function test1() {
  useEffect(function () {
    getCoffee().then((data) => console.log(data));
  }, []);
}

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("Coffee").select("*");
        if (error) {
          console.log("error fetching data", error);
        } else {
          // console.log(data);
          setData(data);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }

    fetchData();
  }, []);

  console.log("Data: ", data);

  const addToCart = useStore((state) => state.addToCart);
  const calcullateCartPrice = useStore((state) => state.calcullateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();
  const ListRef = useRef();

  const CoffeeList = useStore((state) => state.CoffeeList);
  const BeanList = useStore((state) => state.BeanList);
  // console.log(BeanList);
  const [searchText, setSearchText] = useState("");
  const [categories, setCatehories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );
  // console.log("sortedCoffee = ", sortedCoffee.length);

  function searchCoffee(search) {
    if (search !== "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
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
    setSortedCoffee([...CoffeeList]);
    setSearchText("");
  }

  function CoffeCardAddToCard({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }) {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calcullateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
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
                ? COLORS.primaryOrangeHex
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
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}
                style={styles.CategoryScrollViewItem}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex?.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : { color: "#230c02" },
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
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details", {
                    index: item?.index,
                    id: item?.id,
                    type: item?.type,
                  });
                }}
              >
                <CoffeeCard
                  id={item?.id}
                  index={item?.index}
                  type={item?.type}
                  roasted={item?.roasted}
                  imagelink_square={item?.imagelink_square}
                  name={item?.name}
                  special_ingredient={item?.special_ingredient}
                  average_rating={item?.average_rating}
                  price={item?.prices[2]}
                  buttonPressHandler={CoffeCardAddToCard}
                />
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.CoffeBeansTitle}>Coffee Beans</Text>
        {/* Beans FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            { marginBottom: tabBarHeight },
          ]}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details", {
                    index: item?.index,
                    id: item?.id,
                    type: item?.type,
                    name: item?.name,
                  });
                }}
              >
                <CoffeeCard
                  id={item?.id}
                  index={item?.index}
                  type={item?.type}
                  roasted={item?.roasted}
                  imagelink_square={item?.imagelink_square}
                  name={item?.name}
                  special_ingredient={item?.special_ingredient}
                  average_rating={item?.average_rating}
                  price={item?.prices[2]}
                  buttonPressHandler={CoffeCardAddToCard}
                />
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
    color: "#230C02",
    fontWeight: "bold",
    paddingLeft: 30,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    backgroundColor: "#4d3429",
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
    backgroundColor: COLORS.primaryOrangeHex,
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
  CoffeBeansTitle: {
    fontSize: 18,
    marginLeft: 30,
    marginTop: 20,
    fontWeight: "600",
    color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
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
});
