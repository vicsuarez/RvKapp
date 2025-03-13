import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Platform, Switch, TextInput, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('usd');
  const [exchangeRate, setExchangeRate] = useState('3.70');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const currencies = [
    { label: 'USD (US Dollar)', value: 'usd' },
    { label: 'EUR (Euro)', value: 'eur' },
    { label: 'GBP (British Pound)', value: 'gbp' },
    { label: 'JPY (Japanese Yen)', value: 'jpy' },
    { label: 'CAD (Canadian Dollar)', value: 'cad' },
  ];

  const goBack = () => {
    router.back();
  };

  const handleCurrencySelect = (value) => {
    setCurrency(value);
    setCurrencyModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ExpoStatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Language Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="globe-outline" size={20} color="#333" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Language</Text>
            </View>
            <Text style={styles.cardDescription}>Choose your preferred language</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setLanguage('english')}
              >
                <View style={[styles.radioCircle, language === 'english' && styles.radioCircleSelected]}>
                  {language === 'english' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioLabel}>English</Text>
            </View>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setLanguage('spanish')}
              >
                <View style={[styles.radioCircle, language === 'spanish' && styles.radioCircleSelected]}>
                  {language === 'spanish' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioLabel}>Español</Text>
            </View>
            
            <View style={styles.radioOption}>
              <TouchableOpacity 
                style={styles.radioButton}
                onPress={() => setLanguage('portuguese')}
              >
                <View style={[styles.radioCircle, language === 'portuguese' && styles.radioCircleSelected]}>
                  {language === 'portuguese' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
              <Text style={styles.radioLabel}>Português</Text>
            </View>
          </View>
        </View>

        {/* Currency Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons name="cash-outline" size={20} color="#333" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Currency</Text>
            </View>
            <Text style={styles.cardDescription}>Set your local currency and exchange rate</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Display Currency</Text>
              <TouchableOpacity 
                style={styles.selectContainer}
                onPress={() => setCurrencyModalVisible(true)}
              >
                <Text style={styles.selectText}>
                  {currencies.find(c => c.value === currency)?.label || 'USD (US Dollar)'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#777" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Exchange Rate (1 USD =)</Text>
              <View style={styles.exchangeRateContainer}>
                <TextInput
                  style={styles.exchangeRateInput}
                  value={exchangeRate}
                  onChangeText={setExchangeRate}
                  keyboardType="numeric"
                />
                <Text style={styles.currencyCode}>
                  {currency === 'eur' ? 'EUR' : 
                   currency === 'gbp' ? 'GBP' : 
                   currency === 'jpy' ? 'JPY' : 
                   currency === 'cad' ? 'CAD' : 'USD'}
                </Text>
              </View>
              <Text style={styles.helperText}>
                This rate will be used to convert prices from USD to your local currency
              </Text>
            </View>
          </View>
        </View>

        {/* Appearance Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Ionicons 
                name={isDarkMode ? "moon-outline" : "sunny-outline"} 
                size={20} 
                color="#333" 
                style={styles.cardIcon} 
              />
              <Text style={styles.cardTitle}>Appearance</Text>
            </View>
            <Text style={styles.cardDescription}>Customize the app's appearance</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.switchOption}>
              <Text style={styles.switchLabel}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#e0e0e0", true: "#007AFF" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Currency Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={currencyModalVisible}
        onRequestClose={() => setCurrencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setCurrencyModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {currencies.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.modalItem,
                    currency === item.value && styles.modalItemSelected
                  ]}
                  onPress={() => handleCurrencySelect(item.value)}
                >
                  <Text style={[
                    styles.modalItemText,
                    currency === item.value && styles.modalItemTextSelected
                  ]}>
                    {item.label}
                  </Text>
                  {currency === item.value && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
  },
  cardContent: {
    padding: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    marginRight: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#007AFF',
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 16,
  },
  exchangeRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exchangeRateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '500',
    width: 50,
  },
  helperText: {
    fontSize: 12,
    color: '#777',
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalList: {
    padding: 8,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalItemTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
}); 