import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
export default ProfileViewScreen = () => {
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
            navigation.navigate('Account')
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }}
          />
          <Text style={styles.name}>Admin</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Following</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
        <TouchableOpacity style={styles.buttonContainer} onPress={()=> navigation.navigate('Account')}>
            <Text style={styles.buttonText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=> navigation.navigate('ManageOrder')}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=> navigation.navigate('ManageProduct')}>
            <Text style={styles.buttonText}>Product Management</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primaryTextBlue,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: COLORS.primaryBackground,
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryButtonGreen,
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: COLORS.primaryButtonGreen,
  },
  buttonText: {
    color: COLORS.primaryBackground,
    fontWeight: 'bold',

  }
})
