import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, Platform, StatusBar } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
// Pokemon card aspect ratio (width/height) - standard card is 2.5 x 3.5 inches (portrait orientation)
// This means the card is taller than it is wide
const CARD_ASPECT_RATIO = 2.5 / 3.5;

export default function ScanInterface() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(true);
  const [isRecognized, setIsRecognized] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  
  const cameraRef = useRef(null);
  const isProcessingRef = useRef(false);

  // Handle camera ready event
  const handleCameraReady = useCallback(() => {
    console.log('Camera is ready');
  }, []);

  // Debounced button handlers to prevent multiple rapid presses
  const handleButtonPress = useCallback((action) => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    action();

    // Reset after a short delay
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  }, []);

  const handleCapture = useCallback(() => {
    handleButtonPress(() => {
      console.log('Capturing image');
      // Simulate card recognition after 1 second
      setIsRecognized(true);
      setTimeout(() => {
        setIsRecognized(false);
        // Mock scan result
        setScanResult({
          id: 1,
          name: "Charizard (Rare)",
          set: "Base Set",
          number: "4/102",
          price: 120.50,
          image: { uri: 'https://via.placeholder.com/215x300' },
        });
      }, 1000);
    });
  }, [handleButtonPress]);

  const resetScan = useCallback(() => {
    handleButtonPress(() => {
      setScanResult(null);
    });
  }, [handleButtonPress]);

  const exitScan = useCallback(() => {
    handleButtonPress(() => {
      console.log('Exiting scan');
      router.back();
    });
  }, [router, handleButtonPress]);

  // Calculate status bar height for proper spacing
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

  return (
    <View style={styles.container}>
      {/* Full screen camera */}
      {isScanning && !scanResult && (
        <CameraView
          style={styles.fullScreenCamera}
          ref={cameraRef}
          onCameraReady={handleCameraReady}
        />
      )}

      {/* Close button with extra padding to avoid status bar */}
      <View style={[styles.closeButtonContainer, { paddingTop: statusBarHeight + 16 }]}>
        <TouchableOpacity style={styles.closeButton} onPress={exitScan}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Transparent overlay with scanning frame */}
      <View style={styles.overlayContainer}>
        {!scanResult ? (
          <>
            {/* Top overlay */}
            <View style={styles.topOverlay} />
            
            {/* Bottom overlay */}
            <View style={styles.bottomOverlay} />
            
            {/* Left overlay */}
            <View style={styles.leftOverlay} />
            
            {/* Right overlay */}
            <View style={styles.rightOverlay} />
            
            {/* Card scanning area - no border, just a transparent area */}
            <View style={styles.scanArea}>
              {isRecognized && <View style={styles.recognizedOverlay} />}
            </View>

            {/* PRO badge */}
            <View style={styles.proBadgeContainer}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
                <Text style={styles.proBadgeSubtext}>34 scans remaining.</Text>
              </View>
              <Text style={styles.tapText}>Tap here to get unlimited scans.</Text>
            </View>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Image
              source={scanResult.image}
              style={styles.resultImage}
              resizeMode="cover"
            />
          </View>
        )}
      </View>

      {/* Bottom action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>

        {!scanResult ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCapture}
            disabled={isRecognized}
          >
            <Ionicons name="camera" size={32} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={resetScan}
          >
            <Ionicons name="camera" size={32} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            scanResult ? styles.activeButton : {}
          ]}
          disabled={!scanResult}
        >
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingLeft: 16,
  },
  fullScreenCamera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Create four separate overlays to leave the center area completely transparent
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '25%', // Adjusted for portrait card orientation
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%', // Adjusted for portrait card orientation
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leftOverlay: {
    position: 'absolute',
    top: '25%', // Match with topOverlay
    bottom: '25%', // Match with bottomOverlay
    left: 0,
    width: '15%', // Adjusted for portrait card orientation
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightOverlay: {
    position: 'absolute',
    top: '25%', // Match with topOverlay
    bottom: '25%', // Match with bottomOverlay
    right: 0,
    width: '15%', // Adjusted for portrait card orientation
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanArea: {
    // Using the correct aspect ratio for Pokemon cards (2.5 x 3.5 inches)
    // This creates a portrait (vertical) rectangle
    aspectRatio: CARD_ASPECT_RATIO,
    height: '50%', // Set height instead of width to ensure portrait orientation
    // No border, completely transparent
    backgroundColor: 'transparent',
  },
  recognizedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 128, 255, 0.2)',
    opacity: 0.8,
    zIndex: 5,
  },
  proBadgeContainer: {
    position: 'absolute',
    bottom: 96,
    alignItems: 'center',
  },
  proBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  proBadgeText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
  },
  proBadgeSubtext: {
    color: 'black',
    fontSize: 12,
  },
  tapText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  resultContainer: {
    position: 'relative',
    aspectRatio: CARD_ASPECT_RATIO, // Correct card aspect ratio
    height: '50%', // Match with scanArea
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#171717',
    borderColor: '#171717',
  },
}); 