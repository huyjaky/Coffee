import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
import { useDispatch } from "react-redux";
import { Menu, Box, Pressable, HamburgerIcon } from 'native-base';
function CRUDmenu({style}) {
  return (
    <Box w="30%" alignItems="center" style={style}>
      <Menu w="100" trigger={triggerProps => {
        return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <HamburgerIcon/>
        </Pressable>;
      }}>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
        <Menu.Item>View</Menu.Item>
      </Menu>
    </Box>
  );
}

export default CRUDmenu;
