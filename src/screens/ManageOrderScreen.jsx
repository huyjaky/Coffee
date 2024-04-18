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


  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      name_pr: 'Mouse',
      des: 'auto mouse',
      imagelink_square: 'img1',
      imagelink_portrait: 'img2',
      ingredients: 'plastic',
      special_ingredient: 'ultra plastic',

      // dung floatParse chinh lai sau
      avarage_rating: '1',
      ratings_count: '1.2',
      // chinh lai 1 0
      favourite: '1',
      type_pr: 'type pr qq',
      index_pr: productsList.concat(productsList2).length+'',
      // hoan thien giao dien thi chinh lai cai nay
      owned_id: 'id1',
      derived: 'my house',
      category_pr: 'my dick too big'
    }
  });
  const onSubmit = data => {
    console.log(data);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

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
                    value={value}
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
            title="Button"
            onPress={handleSubmit(onSubmit)}
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
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
