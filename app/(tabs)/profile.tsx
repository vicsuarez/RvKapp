import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, TextInput, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    username: "pokecollector92",
    avatar: { uri: 'https://via.placeholder.com/150' },
    memberSince: "March 2023",
    scans: 145,
    savedCards: 487,
    collectionStats: {
      totalCards: 487,
      totalValue: 2345.67,
      setsCompleted: 3,
    },
  };

  const handleLogout = () => {
    // Handle logout logic here
    alert('Logged out successfully');
  };

  const navigateToSettings = () => {
    // Navigate to settings page
    router.push('/screens/settings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ExpoStatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeaderContainer}>
          <View style={styles.avatarContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.scans}</Text>
                <Text style={styles.statLabel}>Scans</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{user.savedCards}</Text>
                <Text style={styles.statLabel}>Cards</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'account' && styles.activeTabButton]} 
            onPress={() => setActiveTab('account')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'account' && styles.activeTabText]}>
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'security' && styles.activeTabButton]} 
            onPress={() => setActiveTab('security')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'security' && styles.activeTabText]}>
              Security
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'account' ? (
          <View style={styles.tabContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Display Name</Text>
              <TextInput 
                style={styles.input}
                defaultValue={user.name}
                placeholder="Your name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput 
                style={styles.input}
                defaultValue={user.email}
                placeholder="Your email"
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tabContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter current password"
                secureTextEntry
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Options</Text>
          
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="time-outline" size={18} color="#555" style={styles.optionIcon} />
              <Text style={styles.optionText}>Scan History</Text>
            </View>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionButtonText}>View</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="card-outline" size={18} color="#555" style={styles.optionIcon} />
              <Text style={styles.optionText}>Subscription</Text>
            </View>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <Ionicons name="settings-outline" size={18} color="#555" style={styles.optionIcon} />
              <Text style={styles.optionText}>App Settings</Text>
            </View>
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={navigateToSettings}
            >
              <Text style={styles.optionButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={18} color="#555" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileHeaderContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#777',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  optionButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
}); 