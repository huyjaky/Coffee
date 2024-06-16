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
import PopUpAnimation from "../components/PopUpAnimation";

const Tab = createMaterialTopTabNavigator();

function ManageOrderScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const productsList = useSelector((state) => state.products.productsList);
  const productsList2 = useSelector((state) => state.products.productsList2);
  const isUpdate = useSelector((state) => state.products.isUpdate);
  const [showAnimation, setShowAnimation] = useState(false);
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
    defaultValues: isUpdate
      ? { ...currentDetailCart.manage_prices[0].prices }
      : {
          prices_id: uuidv4(),
          unit: "gm",
          price: "123",
          size: "123",
        },
  });

  function convertPriceList(data) {
    console.log(data);
    return data.manage_prices[0].prices;
  }

  const [pricesList, setPriceList] = useState(
    isUpdate
      ? convertPriceList(currentDetailCart)
      : {
          prices_id: uuidv4(),
          unit: "gm",
          price: "123",
          size: "123",
        }
  );

  async function insertPirces(data) {
    const insertPrice = await supabase.from("prices").insert(pricesList);
    console.log("finish add price");
    const id_pr = data.id_pr;
    console.log("id_pr", id_pr);
    const insertManagePrice = await supabase
      .from("manage_prices")
      .insert({ prices_id: pricesList.prices_id, id_pr: id_pr });
    console.log(insertManagePrice.error);
    console.log("finish add manage price");
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
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate("HomeScreen");
    }, 2000);
    return imgUploadP;
  }

  async function createProduct(data) {
    console.log(data);
    setIsLoadig(true);
    const uploadP = await uploadPImg();
    console.log("finish upload img");
    const uploadSq = await uploadSqImg();
    console.log("finish upload sqimg");

    // const priceimgSq = pricesList.map((item) => {
    //   return { prices: { ...item } };
    // });
    // console.log(priceimgSq);

    if (data.category_pr === "medicine") {
      dispatch(
        productsSlice.actions.UPDATE_PRODUCTS2([
          {
            ...data,
            manage_prices: [{ prices: pricesList }],
            imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
            imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
          },
        ])
      );
      console.log("finish add");
    } else if (data.category_pr === "medical equipment") {
      dispatch(
        productsSlice.actions.UPDATE_PRODUCTS([
          {
            ...data,
            manage_prices: [{ prices: pricesList }],
            imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
            imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
          },
        ])
      );
    }
    console.log("finish update local pr");

    if (data) {
      const { error } = await supabase.from("products").insert({
        ...data,
        imagelink_portrait: uploadP.data.fullPath.replace("Images/", ""),
        imagelink_square: uploadSq.data.fullPath.replace("Images/", ""),
      });
      console.log("finish upload pr");

      console.log("create products", error);
      insertPirces(data);
    }
    setIsLoadig(false);
    return;
  }

  async function updatedPrice(data) {
    const temp_id = data.prices_id;
    delete data.prices_id;
    console.log("price data", data);
    const { error } = await supabase
      .from("prices")
      .update({ ...data })
      .eq("prices_id", temp_id);
    console.log(error);
    console.log("finish update prices");
    return;
  }

  async function updatedProduct(data) {
    const temp_id = data.id_pr;
    updatedPrice(prices.getValues());
    delete data.manage_prices;
    delete data.id_pr;
    const { error } = await supabase
      .from("products")
      .update({ ...data })
      .eq("id_pr", temp_id);
    console.log("finish update product");
    console.log(error);
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate("HomeScreen");
    }, 2000);
    return;
  }

  console.log("errors", products.formState.errors);

  const pickImage = async (typeImg) => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log("img file", result);

      if (!result.canceled) {
        if (typeImg.Square) {
          setImgSquare(result);
        } else if (typeImg.Portrait) {
          setImgPortrait(result);
        }
      } else {
        console.log("User cancelled the image picker");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  async function loadImg(item, isSquare) {
    if (!isUpdate) return
    const { data, error } = await supabase.storage
      .from("Images")
      .getPublicUrl(item);
    if (error) print(error);
    if (data) {
      console.log(data);
      // if (data) console.log(currentDetailCart.manage_prices[0].prices);
      if (isSquare) {
        setImgSquare(data.publicUrl);
      } else {
        setImgPortrait(data.publicUrl);
      }
    }
  }
  React.useEffect(() => {
    if (currentDetailCart) {
      loadImg(currentDetailCart.imagelink_square, true);
      loadImg(currentDetailCart.imagelink_portrait, false);
    }
  }, [currentDetailCart, isUpdate]);

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
            {isUpdate ? (
              <Image
                source={{
                  uri: ImgSquare ? ImgSquare : "",
                }}
                alt="image"
              />
            ) : (
              <Image
                source={{
                  uri: !ImgSquare
                    ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    : ImgSquare.assets[0].uri,
                }}
                alt="image"
              />
            )}
            {/* <Image
              source={{
                uri: !ImgSquare
                  ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                  : ImgSquare.assets[0].uri,
              }}
              alt="image"
            /> */}
          </AspectRatio>
          <Center
            bg={COLORS.primaryButtonGreen}
            _dark={{
              bg: COLORS.primaryButtonGreen,
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
            {isUpdate ? (
              <Image
                source={{
                  uri: ImgPortrait ? ImgPortrait : "",
                }}
                alt="image"
              />
            ) : (
              <Image
                source={{
                  uri: !ImgPortrait
                    ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    : ImgPortrait.assets[0].uri,
                }}
                alt="image"
              />
            )}
            {/* <Image
              source={{
                uri: !ImgPortrait
                  ? "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                  : ImgPortrait.assets[0].uri,
              }}
              alt="image"
            /> */}
          </AspectRatio>
          <Center
            bg={COLORS.primaryButtonGreen}
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
            Image Link Portrait
          </Center>
        </TouchableOpacity>
      </Box>
    );
  }

  React.useEffect(() => {}, [isUpdate]);
  React.useEffect(() => {
    return () => {
      dispatch(productsSlice.actions.SET_IS_UPDATE(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require("../lottie/successful.json")}
        />
      ) : null}

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
                                // placeholder={`${value}`}
                                placeholder={isUpdate ? "" : `${value}`}
                                value={isUpdate ? `${value}` : value}
                              />
                              <Divider />
                            </>
                          );

                        return (
                          <Input
                            // style={styles.input}
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            placeholder={isUpdate ? "" : `${value}`}
                            value={isUpdate ? `${value}` : value}
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

              <View style={styles.prices}>
                {formDataPrice.map((item2, index2) => {
                  return (
                    <View key={uuidv4()} style={styles.pricesItem}>
                      <View>
                        <Text style={styles.label}>{item2.name}</Text>
                        <Controller
                          control={prices.control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={(value) => onChange(value)}
                              placeholder={isUpdate ? "" : `${value}`}
                              value={isUpdate ? `${value}` : value}
                            />
                          )}
                          name={item2.id}
                          rules={{ required: true }}
                        />
                      </View>
                    </View>
                  );
                })}
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
                  {isLoading ? (
                    <Text style={styles.buttonText}>Loading ...</Text>
                  ) : (
                    <Text style={styles.buttonText}>
                      {isUpdate ? "Edit" : "Create"}
                    </Text>
                  )}
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
    marginTop: 20,
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
