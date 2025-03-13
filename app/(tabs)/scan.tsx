import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Stack } from 'expo-router';
import ScanInterface from '@/app/components/ScanInterface';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function ScanPage() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ExpoStatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />
      <ScanInterface />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
}); 