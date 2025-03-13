import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({ title, onPress, icon = null, color = '#fff', size = 24, style = {} }) => {
  // Define a larger hit area for better touch response
  const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };
  
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.buttonPressed
      ]}
      hitSlop={hitSlop}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: false }}
    >
      <View style={styles.buttonContent}>
        {icon && <Ionicons name={icon} size={size} color={color} />}
        {title && <Text style={[styles.text, { color }]}>{title}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    minWidth: 80, // Ensure buttons have a minimum width
    minHeight: 60, // Ensure buttons have a minimum height
    elevation: 3, // Add shadow on Android
  },
  buttonPressed: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Button; 