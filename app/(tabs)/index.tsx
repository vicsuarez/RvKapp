import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('valuable');

  // Mock data for valuable cards
  const valuableCards = [
    {
      id: 1,
      name: "Charizard VMAX",
      set: "Darkness Ablaze",
      number: "20/189",
      price: 89.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
    {
      id: 2,
      name: "Pikachu VMAX",
      set: "Vivid Voltage",
      number: "44/185",
      price: 34.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
    {
      id: 3,
      name: "Mewtwo V",
      set: "Brilliant Stars",
      number: "72/189",
      price: 24.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
    {
      id: 4,
      name: "Umbreon VMAX",
      set: "Evolving Skies",
      number: "95/203",
      price: 119.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
  ];

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: "Charizard VMAX",
      set: "Darkness Ablaze",
      number: "20/189",
      price: 89.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
    {
      id: 2,
      name: "Charizard V",
      set: "Darkness Ablaze",
      number: "19/189",
      price: 4.99,
      image: { uri: 'https://via.placeholder.com/215x300' },
    },
  ];

  // Popular search suggestions
  const suggestions = ["Charizard", "Pikachu", "Mewtwo", "Scarlet & Violet", "Evolving Skies", "Brilliant Stars"];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ExpoStatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RvK</Text>
        </View>

        <ScrollView style={styles.content}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, set, or number..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close" size={20} color="#777" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Quick Search Options */}
          {!searchResults.length && !isSearching && (
            <View style={styles.tagsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tagButton}
                    onPress={() => handleSuggestionClick(suggestion)}
                  >
                    <Text style={styles.tagText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Search Results */}
          {isSearching && (
            <View style={styles.loadingContainer}>
              <Text>Searching...</Text>
            </View>
          )}

          {searchResults.length > 0 ? (
            <View style={styles.searchResultsContainer}>
              <View style={styles.searchResultsHeader}>
                <Text style={styles.sectionTitle}>Search Results</Text>
                <TouchableOpacity onPress={clearSearch}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              {searchResults.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.cardResultItem}
                  onPress={() => router.push(`/card/${card.id}`)}
                >
                  <View style={styles.cardThumbnail}>
                    <Image source={card.image} style={styles.thumbnailImage} />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <Text style={styles.cardDetails}>
                      {card.set} · {card.number}
                    </Text>
                    <Text style={styles.cardPrice}>${card.price.toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            !isSearching && (
              <View style={styles.tabsContainer}>
                <View style={styles.tabButtons}>
                  <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'valuable' && styles.activeTabButton]}
                    onPress={() => setActiveTab('valuable')}
                  >
                    <Text style={[styles.tabButtonText, activeTab === 'valuable' && styles.activeTabText]}>
                      Valuable
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'recent' && styles.activeTabButton]}
                    onPress={() => setActiveTab('recent')}
                  >
                    <Text style={[styles.tabButtonText, activeTab === 'recent' && styles.activeTabText]}>
                      Recent Sets
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'trending' && styles.activeTabButton]}
                    onPress={() => setActiveTab('trending')}
                  >
                    <Text style={[styles.tabButtonText, activeTab === 'trending' && styles.activeTabText]}>
                      Trending
                    </Text>
                  </TouchableOpacity>
                </View>

                {activeTab === 'valuable' && (
                  <View style={styles.tabContent}>
                    <Text style={styles.sectionTitle}>Most Valuable Cards</Text>
                    <View style={styles.cardsGrid}>
                      {valuableCards.map((card) => (
                        <TouchableOpacity
                          key={card.id}
                          style={styles.cardItem}
                          onPress={() => router.push(`/card/${card.id}`)}
                        >
                          <View style={styles.cardImageContainer}>
                            <Image source={card.image} style={styles.cardImage} />
                            <View style={styles.priceBadge}>
                              <Text style={styles.priceText}>${card.price}</Text>
                            </View>
                          </View>
                          <View style={styles.cardItemInfo}>
                            <Text style={styles.cardName} numberOfLines={1}>
                              {card.name}
                            </Text>
                            <Text style={styles.cardDetails}>
                              {card.set} · {card.number}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {activeTab === 'recent' && (
                  <View style={styles.emptyTabContent}>
                    <Text style={styles.emptyText}>Recent sets content</Text>
                  </View>
                )}

                {activeTab === 'trending' && (
                  <View style={styles.emptyTabContent}>
                    <Text style={styles.emptyText}>Trending content</Text>
                  </View>
                )}
              </View>
            )
          )}
        </ScrollView>
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
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  tagsContainer: {
    marginBottom: 24,
  },
  tagButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  searchResultsContainer: {
    marginBottom: 24,
  },
  searchResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  clearText: {
    color: '#007AFF',
    fontSize: 14,
  },
  cardResultItem: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  cardThumbnail: {
    width: 48,
    height: 64,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  cardDetails: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    flex: 1,
  },
  tabButtons: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#f5f5f5',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#777',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
    aspectRatio: 0.7,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardItemInfo: {
    padding: 8,
  },
  emptyTabContent: {
    flex: 1,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
  },
});
