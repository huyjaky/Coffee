import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Optional: For icons
import { useNavigation } from '@react-navigation/native';
import ManageOrderScreen from './ManageOrderScreen'; // Import the ManageOrderScreen component
import { useSelector } from 'react-redux';

const DATA = [
  { id: 5, title: 'Account', icon: 'account-circle-outline' },
  { id: 1, title: 'Manage Users', icon: 'account-multiple' }, // Sample data
  { id: 2, title: 'Orders Management', icon: 'cart-outline' },
  { id: 3, title: 'View Carts', icon: 'pencil-outline' },
  { id: 4, title: 'Product management', icon: 'store' },
];

const AdminScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user)
  const renderItem = ({ item }) => {

    // remove tage pr manage while buyer role
    if (user.role === 'buyer') {
      if (item.title === 'Product management' ||
        item.title === 'View Carts' ||
        item.title === 'Manage Users'
      ) {
        return
      }
    }

    return (
      <TouchableOpacity style={styles.listItem} onPress={() => {
        // Navigate to ManageOrderScreen when "Orders Management" is pressed
        switch (item.title) {
          case 'Orders Management':
            navigation.navigate('ManageOrder');
            break;
          case 'Product management':
            navigation.navigate('ManageProduct');
            break;
          case 'Manage Users':
            navigation.navigate('ManageUser');
            break;
          case 'Account':
            navigation.navigate('Account');
            break;
          default:
            console.log("Undefined item.title");
            break;

        }
      }}>
        {item.icon && (
          <MaterialCommunityIcons name={item.icon} size={24} style={styles.icon} />
        )}
        <Text style={styles.listItemText}>{item.title}</Text>
      </TouchableOpacity>

    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Admin Panel</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false} // Optional: Hide scroll indicator
      />
      {/* Add optional logout button or other admin actions */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  icon: {
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default AdminScreen;
