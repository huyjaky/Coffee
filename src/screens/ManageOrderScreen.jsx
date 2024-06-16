import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  AspectRatio,
  Box,
  Center,
  CheckIcon,
  Divider,
  FormControl,
  Image,
  Input,
  Select,
  Stack,
  TextArea,
} from "native-base";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formData, formDataPrice } from "../data/form";
import { supabase } from "../store/supabase";
import { COLORS } from "../theme/theme";

import { decode } from "base64-arraybuffer";
import { productsSlice } from "../store/states/products";

const Tab = createMaterialTopTabNavigator();

function ManageOrderScreen({ navigation, isUpdate }) {
  const [orders, setOrders] = useState([]);
  const productsList = useSelector((state) => state.products.productsList);
  const productsList2 = useSelector((state) => state.products.productsList2);
  const user = useSelector((state) => state.user.user);
  const currentDetailCart = useSelector(
    (state) => state.products.currentDetailCart
  );
  const [ImgPortrait, setImgPortrait] = useState();
  const [ImgSquare, setImgSquare] = useState();
  const [service, setService] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoadig] = useState(false);

  const products = useForm({
    defaultValues: isUpdate
      ? { ...currentDetailCart }
      : {
          id_pr: uuidv4(),
          name_pr: "Mouse",
          des: "auto mouse",
          imagelink_square: "img1",
          imagelink_portrait: "img2",
          ingredients: "plastic",
          special_ingredient: "ultra plastic",
          average_rating: parseFloat(1),
          ratings_count: parseFloat(1.2),
          favourite: 1,
          type_pr: "type pr qq",
          index_pr: productsList.concat(productsList2).length,
          owned_id: "f337d26b-2961-4ff1-b114-3592d4c440bb",
          derived: "my house",
          category_pr: "medicine",
          status: "realease",
        },
  });

  const prices = useForm({
    defaultValues: {
      prices_id: uuidv4(),
      unit: "",
      price: "",
      size: "",
    },
  });

  function convertPriceList(data) {
    const temp = [];
    data.manage_prices.map((item) => {
      temp.push({ ...item.prices });
      return item;
    });
    return temp;
  }

  const [pricesList, setPriceList] = useState(
    isUpdate
      ? convertPriceList
      : [
          {
            prices_id: uuidv4(),
            unit: "gm",
            price: "123",
            size: "123",
          },
        ]
  );

  function convertPricesWithProduct(data, id_pr) {
    const temp = [];
    pricesList.map((item) => {
      temp.push({ prices_id: item.prices_id, id_pr: id_pr });
      return item;
    });
    console.log("manages price list", temp);
    return temp;
  }

  async function removePrices(prices_id) {
    // const { error } = await supabase.from('prices').delete().eq('prices_id', prices_id);
    // console.log('remove prices', error);
  }

  async function insertPirces(data) {
    const insertPrice = await supabase.from("prices").insert(pricesList);
    const id_pr = data.id_pr;
    const insertManagePrice = await supabase
      .from("manage_prices")
      .insert(convertPricesWithProduct(pricesList, id_pr));
  }

  async function uploadSqImg() {
    // upload image square to dtb
    const imgSq = ImgSquare.assets[0];
    const base64Sq = await FileSystem.readAsStringAsync(imgSq.uri, {
      encoding: "base64",
    });
    const filePathSq = `${user.user.id}/${new Date().getTime()}.${
      imgSq.type === "image" ? "png" : "mp4"
    }`;
    const contentTypeSq = imgSq.type === "image" ? "image/png" : "video/mp4";

    const imgUploadSq = await supabase.storage
      .from("Images")
      .upload(filePathSq, decode(base64Sq), { contentTypeSq });
    console.log("upload square", imgUploadSq.error);
    return imgUploadSq;
  }

  async function uploadPImg() {
    console.log("user", user.user.id);
    // upload image portrait to dtb
    const imgP = ImgPortrait.assets[0];

    const base64P = await FileSystem.readAsStringAsync(imgP.uri, {
      encoding: "base64",
    });
    const filePathP = `${user.user.id}/${new Date().getTime()}.${
      imgP.type === "image" ? "png" : "mp4"
    }`;
    const contentTypeP = imgP.type === "image" ? "image/png" : "video/mp4";

    const imgUploadP = await supabase.storage
      .from("Images")
      .upload(filePathP, decode(base64P), { contentTypeP });
    console.log("upload portrait", imgUploadP.error);
    return imgUploadP;
  }

  async function createProduct(data) {
    console.log(data);
    setIsLoadig(true);
    const uploadP = await uploadPImg();
    const uploadSq = await uploadSqImg();

    const priceTemp = pricesList.map((item) => {
      return { prices: { ...item } };
    });
    console.log(priceTemp);

    if (data) {
      const { error } = await supabase.from("products").insert({
        ...data,
        imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
        imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
      });

      console.log("create products", error);
      insertPirces(data);
    }

    if (data.category_pr === "medicine") {
      dispatch(
        productsSlice.actions.UPDATE_PRODUCTS2([
          {
            ...data,
            manage_prices: [...priceTemp],
            imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
            imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
          },
        ])
      );
    } else if (data.category_pr === "medical equipment") {
      dispatch(
        productsSlice.actions.UPDATE_PRODUCTS([
          {
            ...data,
            manage_prices: [...priceTemp],
            imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
            imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
          },
        ])
      );
    }

    setIsLoadig(false);
    return;
  }

  async function updatedProduct(data) {
    const { error } = await supabase.from("products").upsert({ ...data });
    // updatePrices(data);
    console.log(error);
    return;
  }

  console.log("errors", products.formState.errors);

  const [image, setImage] = useState(null);

  const pickImage = async (typeImg) => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("img file", result);

      if (typeImg.Square) {
        setImgSquare(result);
      } else if (typeImg.Portrait) {
        setImgPortrait(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // @WARNING: modifier tab on form
  function Imagelink_square() {
    return (
      <Box>
        <TouchableOpacity
          onPress={() => {
            pickImage({ Square: true });
          }}
        >
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: !ImgSquare
                  ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                  : ImgSquare.assets[0].uri,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            Image Link Square
          </Center>
        </TouchableOpacity>
      </Box>
    );
  }

  function Imagelink_portrait() {
    // console.log(ImgPortrait.assets[0].uri);
    return (
      <Box>
        <TouchableOpacity
          onPress={() => {
            pickImage({ Portrait: true });
          }}
        >
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: !ImgPortrait
                  ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                  : ImgPortrait.assets[0].uri,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            Image Link Square
          </Center>
        </TouchableOpacity>
      </Box>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Box alignItems="center">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Box>
              <View style={{ width: "100%", height: 250 }}>
                <Tab.Navigator>
                  <Tab.Screen
                    style={{ backgroundColor: "#FFFFFF" }}
                    name="preview square card"
                    component={Imagelink_square}
                  />
                  <Tab.Screen
                    name="preview portrait card"
                    component={Imagelink_portrait}
                  />
                </Tab.Navigator>
              </View>
            </Box>

            <Stack p="4" space={3}>
              <Controller
                control={products.control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Box maxW="300">
                    <Select
                      selectedValue={products.getValues("category_pr")}
                      minWidth="200"
                      accessibilityLabel="Choose Service"
                      placeholder="Choose Service"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => onChange(itemValue)}
                    >
                      <Select.Item label="Medicine" value="medicine" />
                      <Select.Item
                        label="Medical Equipment"
                        value="medical equipment"
                      />
                    </Select>
                  </Box>
                )}
                name={"category_pr"}
                rules={{ required: true }}
              />

              {formData.map((item, index) => {
                if (
                  item.id === "favourite" ||
                  item.id === "average_rating" ||
                  item.id === "ratings_count" ||
                  item.id === "owned_id" ||
                  item.id === "index_pr" ||
                  item.id === "imagelink_square" ||
                  item.id === "imagelink_portrait"
                )
                  return;

                return (
                  <FormControl mb="1" key={uuidv4()}>
                    <FormControl.Label>{item.name}</FormControl.Label>
                    <Controller
                      control={products.control}
                      render={({ field: { onChange, onBlur, value } }) => {
                        if (item.id === "des")
                          return (
                            <>
                              <TextArea
                                // style={styles.input}
                                mb={8}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                value={`${value}`}
                              />
                              <Divider />
                            </>
                          );

                        return (
                          <Input
                            // style={styles.input}
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={`${value}`}
                          />
                        );
                      }}
                      name={item.id}
                      rules={{ required: true }}
                    />
                    <FormControl.HelperText>
                      {/* where u input NOte for user */}
                    </FormControl.HelperText>
                  </FormControl>
                );
              })}

              {pricesList.map((item1, index1) => {
                const keyItemPrice = uuidv4();
                return (
                  <View key={keyItemPrice} style={styles.prices}>
                    {formDataPrice.map((item2, index2) => {
                      return (
                        <View key={uuidv4()} style={styles.pricesItem}>
                          <View>
                            {index1 == 0 ? (
                              <Text style={styles.label}>{item2.name}</Text>
                            ) : (
                              <Text></Text>
                            )}
                            <Controller
                              control={prices.control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <TextInput
                                  style={styles.input}
                                  onBlur={onBlur}
                                  onChangeText={(value) => onChange(value)}
                                  value={`${value}`}
                                />
                              )}
                              name={item2.id}
                              rules={{ required: true }}
                            />
                          </View>
                        </View>
                      );
                    })}
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          if (pricesList.length == 1) return;

                          const temp = [
                            ...pricesList.filter(
                              (item) => item.prices_id !== item1.prices_id
                            ),
                          ];
                          setPriceList(temp);
                        }}
                      >
                        <AntDesign
                          name="close"
                          color={COLORS.primaryNovel}
                          size={33}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: "#FFFFFF" }}
                  onPress={() => {
                    setPriceList([
                      ...pricesList,
                      {
                        prices_id: uuidv4(),
                        unit: "gm",
                        price: "123",
                        size: "123",
                      },
                    ]);
                  }}
                >
                  <Text style={{ ...styles.buttonText, color: "#1DCBB6" }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    reset({});
                  }}
                >
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  disabled={isLoading}
                  onPress={products.handleSubmit(
                    isUpdate ? updatedProduct : createProduct
                  )}
                >
                  <Text style={styles.buttonText}>
                    {isUpdate ? "Update" : "Create"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Stack>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}

export default ManageOrderScreen;

const styles = StyleSheet.create({
  prices: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  pricesItem: {
    width: "25%",
  },
  label: {
    color: COLORS.primaryNovel,
    margin: 20,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.primaryButtonGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: COLORS.primaryBackground,
    height: 40,
    padding: 5,
    borderRadius: 4,
  },
});
