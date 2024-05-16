import Constants from 'expo-constants';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from 'react-hook-form';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { formData, formDataPrice } from '../data/form';
import { supabase } from '../store/supabase';
import { COLORS } from '../theme/theme';

function ManageOrderScreen({ navigation, isUpdate }) {
  const [orders, setOrders] = useState([]);
  const productsList = useSelector(state => state.products.productsList);
  const productsList2 = useSelector(state => state.products.productsList2);
  const user = useSelector(state => state.user.user);
  const currentDetailCart = useSelector(state => state.products.currentDetailCart);
  
  const products = useForm({
    defaultValues: isUpdate ? { ...currentDetailCart } : {
      id_pr: uuidv4(),
      name_pr: 'Mouse',
      des: 'auto mouse',
      imagelink_square: 'img1',
      imagelink_portrait: 'img2',
      ingredients: 'plastic',
      special_ingredient: 'ultra plastic',
      average_rating: parseFloat(1),
      ratings_count: parseFloat(1.2),
      favourite: 1,
      type_pr: 'type pr qq',
      index_pr: productsList.concat(productsList2).length,
      owned_id: 'f337d26b-2961-4ff1-b114-3592d4c440bb',
      derived: 'my house',
      category_pr: 'my dick too big',
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
  });

  function convertPriceList(data) {
    const temp = [];
    data.manage_prices.map((item) => {
      temp.push({ ...item.prices });
      return item;
    });
    return temp;
  }

  const [pricesList, setPriceList] = useState(isUpdate ? convertPriceList : [{
    prices_id: uuidv4(), unit: 'gm', price: '123', size: '123'
  }]);

  useEffect(() => { }, [pricesList]);

  function convertPricesWithProduct(data) {
    const temp = [];
    pricesList.map((item) => {
      temp.push({ prices_id: item.prices_id, id_pr: data.id_pr });
      return item;
    });
  }

  async function removePrices(prices_id) {
    const { error } = await supabase.from('prices').delete().eq('prices_id', prices_id);
    console.log('remove prices', error);
  }

  async function insertPirces(data) {
    const insertPrice = await supabase.from('prices').insert(pricesList);
    const insertManagePrice = await supabase.from('manage_prices').insert(convertPricesWithProduct(data));
    console.log('insertManagePrice', insertManagePrice.error);
    console.log('insertPirces', insertPrice.error);
  }

  async function updatePrices(_data) {
    const { data, error } = await supabase.from('prices').upsert(pricesList);
    if (error) {
      console.log(error);
      return;
    };
  }

  async function createProduct(data) {
    const { error } = await supabase.from('products').insert({ ...data });
    insertPirces(data);
    console.log('create products', error);
    return;
  }

  async function updatedProduct(data) {
    const { error } = await supabase.from('products').upsert({ ...data });
    updatePrices(data);
    console.log(error);
    return;
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
              {formDataPrice.map((item2, index2) => {
                return (
                  <View key={index2} style={styles.pricesItem}>
                    <View>
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
                );
              })}
              <View>
                <AntDesign
                  name="close"
                  color={COLORS.primaryNovel}
                  size={33}
                />
              </View>
            </View>
          );
        })}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(typeof(pricesList));
              setPriceList([...pricesList,
                { prices_id: uuidv4(), unit: 'gm', price: '123', size: '123' }
              ]);
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
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
            onPress={prices.handleSubmit(isUpdate ? updatedProduct : createProduct)}
          >
            <Text style={styles.buttonText}>{isUpdate ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
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
    color: COLORS.primaryNovel,
    margin: 20,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 'bold',

  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.primaryButtonGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: COLORS.primaryCardBackground,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
