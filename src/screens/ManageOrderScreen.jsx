import Constants from 'expo-constants';
import * as React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { formData } from '../data/form';
import { supabase } from '../store/supabase';
import { v4 as uuidv4 } from 'uuid';

function ManageOrderScreen({ navigation }) {
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

  // const [id_pr, setId_pr] = useState(uuidv4())
  // const [prices_id, setPrices_id] = useState(uuidv4())
  const [prices, setPrices] = useState([
    { prices_id: uuidv4(), price: parseFloat(20), unit: 'gm', size: 10 }
  ])

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
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

  async function createProduct(data) {
    const { error } = await supabase.from('products').insert({ ...data })
    console.log(error)
    return
  }

  async function updatedProduct(data) {
    const { error } = await supabase.from('products').update({ ...data }).eq('')
    console.log(error)
    return
  }


  console.log('errors', errors);

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
              <Text style={styles.label}>{item.name}</Text>
              <Controller
                control={control}
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
            title="Create"
            onPress={handleSubmit(createProduct)}
          />
        </View>


        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Update"
            onPress={handleSubmit(updatedProduct)}
          />
        </View>

      </ScrollView>
    </View>
  );
}

export default ManageOrderScreen;

const styles = StyleSheet.create({
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
  prices: {

  }
});
