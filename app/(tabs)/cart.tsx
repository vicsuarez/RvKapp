import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function CartPage() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Charizard VMAX",
      set: "Darkness Ablaze",
      number: "20/189",
      price: 89.99,
      quantity: 1,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
    {
      id: 2,
      name: "Pikachu VMAX",
      set: "Vivid Voltage",
      number: "44/185",
      price: 34.99,
      quantity: 2,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear All", 
          onPress: () => setCartItems([]),
          style: "destructive"
        }
      ]
    );
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ExpoStatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.collectionTitle}>Your Collection ({totalItems})</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartText}>
              Add some cards to your cart to get started.
            </Text>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Start Scanning</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={styles.content}>
            <View style={styles.cartItemsContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cardThumbnail}>
                    <Image source={item.image} style={styles.thumbnailImage} />
                  </View>
                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => removeItem(item.id)}
                      >
                        <Ionicons name="trash-outline" size={18} color="#777" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemSet}>
                      {item.set} · {item.number}
                    </Text>
                    <View style={styles.itemFooter}>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Ionicons name="remove" size={14} color="#777" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Ionicons name="add" size={14} color="#777" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        {item.quantity > 1 && (
                          <Text style={styles.totalItemPrice}>
                            ${(item.price * item.quantity).toFixed(2)} total
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${totalValue.toFixed(2)}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Value</Text>
                <Text style={styles.totalValue}>${totalValue.toFixed(2)}</Text>
              </View>

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={clearCart}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exportButton}>
                  <Text style={styles.exportButtonText}>Export List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  cartItemsContainer: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardThumbnail: {
    width: 48,
    height: 67,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  itemSet: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalItemPrice: {
    fontSize: 12,
    color: '#777',
  },
  removeButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#777',
  },
  summaryValue: {
    fontSize: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  exportButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
}); 