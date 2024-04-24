import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import { COLORS } from '../theme/theme';
import { Menu, Center, Image } from 'native-base';
import CRUDmenu from '../components/CRUDmenu';
function ManageProductScreen({ navigation }) {
  // Define state for managing products
  const [products, setProducts] = useState([]);
  const data = [{ name: "Drug1" }, { name: "Drug2" }, { name: "Drug3" }, { name: "Drug4" }, { name: "Drug5" }, { name: "Drug6" }, { name: "Drug7" }, { name: "Drug8" }];
  // // Function to add a new product
  // const addProduct = () => {
  //   // Implement logic to add a new product to the products list
  //   // You can use setProducts to update the state with the new product
  // };

  // // Function to edit an existing product
  // const editProduct = (index, updatedProduct) => {
  //   // Implement logic to edit an existing product in the products list
  //   // You can use setProducts to update the state with the modified product
  // };

  // // Function to delete a product
  // const deleteProduct = (index) => {
  //   // Implement logic to delete a product from the products list
  //   // You can use setProducts to update the state by removing the specified product
  // };

  return (
    <View horizontal={true} style={styles.viewContainer}>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        keyExtractor={(item, index) => item.name + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.productItem}>
              <CRUDmenu style={styles.CRUDmenu} />
              <Center>
                <Image source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" size="xl" />
              </Center>
              <Text style={styles.productText}>{item.name}</Text>
            </View>)
        }}>

      </FlatList>
    </View>
  );
}

export default ManageProductScreen;

const styles = StyleSheet.create({
  // screenContainer: {
  //   flex: 1,
  //   backgroundColor: COLORS.primaryBackground,
  // },
  // contentContainer: {
  //   paddingVertical: 20,
  //   paddingHorizontal: 10,
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  // button: {
  //   backgroundColor: COLORS.primaryButton,
  //   padding: 10,
  //   borderRadius: 5,
  //   marginBottom: 20,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: COLORS.white,
  //   fontSize: 16,
  // },
  // productItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 10,
  //   marginBottom: 10,
  //   backgroundColor: COLORS.primaryLight,
  //   borderRadius: 5,
  // },
  // editButton: {
  //   backgroundColor: COLORS.primaryButton,
  //   padding: 5,
  //   borderRadius: 5,
  //   marginRight: 10,
  // },
  // deleteButton: {
  //   backgroundColor: COLORS.red,
  //   padding: 5,
  //   borderRadius: 5,
  // },
  viewContainer: {
    flex: 1,
    marginTop: 20,
  },
  productItem: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: COLORS.primaryButtonGreen,
    flex: 1,
    height: 200,
    borderRadius: 10
  },
  CRUDmenu: {
    zIndex:1,
    position: 'absolute',
    top: 10,
    right: 5,
  },
  productText: {
    color: COLORS.primaryNovel
  }
});
