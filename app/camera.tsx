import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from './components/Button';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  // Use refs to prevent multiple rapid button presses
  const isProcessingRef = useRef(false);

  // Workaround for flash functionality
  useEffect(() => {
    if (isCameraReady && flash === 'on') {
      // Toggle flash off and on to trigger the torch
      const timer = setTimeout(() => {
        setFlash('off');
        setTimeout(() => {
          setFlash('on');
        }, 100);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isCameraReady, flash]);

  // Handle camera ready event
  const handleCameraReady = useCallback(() => {
    console.log('Camera is ready');
    setIsCameraReady(true);
  }, []);

  // Debounced button handlers to prevent multiple rapid presses
  const handleButtonPress = useCallback((action: () => void) => {
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    action();
    
    // Reset after a short delay
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  }, []);

  const toggleCameraType = useCallback(() => {
    handleButtonPress(() => {
      console.log('Toggling camera type');
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    });
  }, [handleButtonPress]);

  const toggleFlash = useCallback(() => {
    handleButtonPress(() => {
      console.log('Toggling flash');
      setFlash(current => (current === 'off' ? 'on' : 'off'));
    });
  }, [handleButtonPress]);

  const goBack = useCallback(() => {
    handleButtonPress(() => {
      console.log('Going back');
      router.back();
    });
  }, [router, handleButtonPress]);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission denied</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
        <Button title="Go Back" onPress={goBack} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Camera', headerShown: true }} />
      <StatusBar style="light" />
      
      {/* Camera Component */}
      <CameraView 
        style={styles.camera} 
        facing={facing}
        enableTorch={flash === 'on'}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      />
      
      {/* UI Buttons (Placed Outside Camera Component) */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Back" 
          icon="arrow-back" 
          onPress={goBack} 
        />
        <Button 
          title="Flip" 
          icon="camera-reverse" 
          onPress={toggleCameraType} 
        />
        <Button 
          title="Flash" 
          icon={flash === 'off' ? "flash-off" : "flash"} 
          color={flash === 'off' ? "#888" : "#fff"}
          onPress={toggleFlash} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100, // Increased to prevent overlap with system UI
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    zIndex: 10, // Ensure buttons are above other elements
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  }
}); 