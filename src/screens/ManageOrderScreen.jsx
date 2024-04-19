import Constants from 'expo-constants';
import * as React from 'react';
import { useState } from 'react';

import { AntDesign } from "@expo/vector-icons";
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { formData, formDataPrice } from '../data/form';
import { supabase } from '../store/supabase';

function ManageOrderScreen({ navigation, isUpdate }) {
  // Define state for managing orders
  const [orders, setOrders] = useState([]);
  const productsList = useSelector(state => state.products.productsList)
  const productsList2 = useSelector(state => state.products.productsList2)
  const user = useSelector(state => state.user.user)

  // Function to add a new order
  const addOrder = () => {
    // Implement logic to add a new order to the orders list
    // You can use setOrders to update the state with the new order
  };

  // Function to edit an existing order
  const editOrder = (index, updatedOrder) => {
    // Implement logic to edit an existing order in the orders list
    // You can use setOrders to update the state with the modified order
  };

  // Function to delete an order
  const deleteOrder = (index) => {
    // Implement logic to delete an order from the orders list
    // You can use setOrders to update the state by removing the specified order
  };


  const currentDetailCart = useSelector(state => state.products.currentDetailCart)
  // register, setValue, handleSubmit, control, reset, formState: { errors }
  const products = useForm({
    defaultValues: isUpdate ? { ...currentDetailCart } : {
      id_pr: uuidv4(),
      name_pr: 'Mouse',
      des: 'auto mouse',
      imagelink_square: 'img1',
      imagelink_portrait: 'img2',
      ingredients: 'plastic',
      special_ingredient: 'ultra plastic',
      // dung floatParse chinh lai sau
      average_rating: parseFloat(1),
      ratings_count: parseFloat(1.2),
      // cai nay chinh choice cung duoc
      favourite: 1,
      type_pr: 'type pr qq',
      index_pr: productsList.concat(productsList2).length,
      // hoan thien giao dien thi chinh lai cai nay
      owned_id: 'f337d26b-2961-4ff1-b114-3592d4c440bb',
      derived: 'my house',
      category_pr: 'my dick too big',
      // bao gom realease va pending
      status: 'realease',
    }
  });

  const prices = useForm({
    defaultValues: {
      prices_id: uuidv4(),
      unit: '',
      price: '',
      size: '',
    }
  })

  function convertPriceList(data) {
    const temp = []
    data.manage_prices.map((item) => {
      temp.push({ ...item.prices })
      return item
    })
    return temp
  }

  const [pricesList, setPriceList] = useState(isUpdate ? convertPriceList : [{
    prices_id: uuidv4(), unit: 'gm', price: '123', size: '123'
  }])

  useEffect(() => { }, [pricesList])

  function convertPricesWithProduct(data) {
    const temp = []
    pricesList.map((item)=>{
      temp.push({prices_id: item.prices_id, id_pr: data.id_pr})
      return item
    })
  }

  async function insertPirces(data) {
    const insertPrice = await supabase.from('prices').insert(pricesList)
    const insertManagePrice = await supabase.from('manage_prices').insert(convertPricesWithProduct(data))
    console.log('insertManagePrice',insertManagePrice.error);
    console.log('insertPirces',insertPrice.error);
  }

  async function updatePrices(data) {
    const { data, error } = await supabase.from('prices').upsert(pricesList)
    if (error) {
      console.log(error);
      return
    };
  }

  async function createProduct(data) {
    const { error } = await supabase.from('products').insert({ ...data })
    insertPirces(data)
    console.log(error)
    return
  }

  async function updatedProduct(data) {
    const { error } = await supabase.from('products').upsert({ ...data })
    updatePrices(data)
    console.log(error)
    return
  }


  console.log('errors', products.formState.errors);

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };



  return (
    <View style={styles.container}>

      <ScrollView>
        {formData.map((item, index) => {
          return (
            <>
              <Text style={styles.label} key={index}>{item.name}</Text>
              <Controller
                control={products.control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={`${value}`}
                  />
                )}
                name={item.id}
                rules={{ required: true }}
              />
            </>
          )
        })}

        {pricesList.map((item1, index1) => {
          return (
            <View key={index1} style={styles.prices}>
              {
                formDataPrice.map((item2, index2) => {
                  return (
                    <View key={index2} style={styles.pricesItem}>
                      <View >
                        <Text style={styles.label}>{item2.name}</Text>
                        <Controller
                          control={prices.control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              style={styles.input}
                              onBlur={onBlur}
                              onChangeText={value => onChange(value)}
                              value={`${value}`}
                            />
                          )}
                          name={item2.id}
                          rules={{ required: true }}
                        />
                      </View>
                    </View>
                  )
                })
              }
              <View>

                <AntDesign
                  name="close"
                  color='white'
                  size={40}
                />
              </View>
            </View>
          )
        })}


        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="+"
            onPress={() => {
              console.log(typeof (pricesList));
              setPriceList([...pricesList,
              { prices_id: uuidv4(), unit: 'gm', price: '123', size: '123' }
              ])
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Reset"
            onPress={() => {
              reset({})
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title={isUpdate ? 'Update' : 'Create'}
            // onPress={products.handleSubmit(createProduct)}
            onPress={prices.handleSubmit(isUpdate ? updatedProduct : createProduct)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ManageOrderScreen;

const styles = StyleSheet.create({
  prices: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  pricesItem: {
    width: '25%'
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },

});
