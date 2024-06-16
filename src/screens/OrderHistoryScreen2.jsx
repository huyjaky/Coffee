import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import OrderHistoryCard from '../components/OrderHistoryCard';
import { COLORS } from '../theme/theme';
function OrderHistoryScreen2({ navigation }) {
  const OrderHistoryList = useSelector((state) => state.products.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
    // You can trigger a different animation or any other action here
    console.log('Modal closed');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title="No Order History" />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data, index) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index.toString()}
                    onPress={() => openModal(data)}
                    style={styles.OrderItem}
                  >
                    <OrderHistoryCard
                      navigationHandler={() => navigation.push('Details')}
                      CartList={data.CartList}
                      CartListPrice={data.CartListPrice}
                      OrderDate={data.OrderDate}
                      openModal={openModal}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
        onDismiss={closeModal} // Call closeModal when the modal is dismissed
      >
        <View style={styles.modalView}>
          {/* Modal Content */}
          <Text>This is your modal content for the selected order:</Text>
          <Text>{selectedOrder && selectedOrder.OrderDate}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeModalBtnText}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default OrderHistoryScreen2;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: 20,
    gap: 30,
  },
  OrderItem: {
    marginBottom: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeModalBtnText: {
    marginTop: 20,
    color: 'blue',
  },
});
