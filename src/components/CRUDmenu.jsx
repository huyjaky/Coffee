import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import { useDispatch } from "react-redux";
import { Menu, Box, Pressable, HamburgerIcon } from 'native-base';
import { useNavigation } from "@react-navigation/native";
function CRUDmenu({style}) {
  const navigation = useNavigation()
  const handleEdit = () => {
    // Navigate to the edit page
    navigation.navigate('EditProductForm');
  };

  const handleDelete = () => {
    // Navigate to the delete page
    navigation.navigate('DeleteProductScreen');
  };
  return (
    <Box w="30%" alignItems="center" style={style}>
      <Menu w="100" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <HamburgerIcon/>
        </Pressable>;
      }}>
        <Menu.Item onPress={handleEdit}>Edit</Menu.Item>
        <Menu.Item onPress={handleDelete}>Delete</Menu.Item>
      </Menu>
    </Box>
  );
}

export default CRUDmenu;
