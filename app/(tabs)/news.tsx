import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('articles');

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Pokémon TCG: Scarlet & Violet—Paldean Fates Expansion Revealed",
      date: "2023-12-15",
      source: "Pokemon.com",
      excerpt: "The Pokémon Company International has announced the Pokémon TCG: Scarlet & Violet—Paldean Fates expansion, featuring Shiny Pokémon from the Paldea region.",
      image: { uri: 'https://via.placeholder.com/800x400' },
      category: "releases",
      url: "https://www.pokemon.com",
    },
    {
      id: 2,
      title: "Top 10 Most Valuable Cards from Scarlet & Violet",
      date: "2023-12-10",
      source: "TCGPlayer",
      excerpt: "Check out the most valuable cards from the latest Scarlet & Violet expansion, with prices reaching new heights.",
      image: { uri: 'https://via.placeholder.com/800x400' },
      category: "market",
      url: "https://www.tcgplayer.com",
    },
    {
      id: 3,
      title: "Pokémon TCG Live App Gets Major Update",
      date: "2023-12-05",
      source: "Pokemon.com",
      excerpt: "The Pokémon TCG Live app has received a major update, adding new features and fixing several bugs.",
      image: { uri: 'https://via.placeholder.com/800x400' },
      category: "digital",
      url: "https://www.pokemon.com",
    },
    {
      id: 4,
      title: "Championship Series 2024 Dates Announced",
      date: "2023-11-28",
      source: "Play! Pokémon",
      excerpt: "The Pokémon Company has announced the dates for the 2024 Championship Series, with events across North America, Europe, and Asia.",
      image: { uri: 'https://via.placeholder.com/800x400' },
      category: "events",
      url: "https://www.pokemon.com/play",
    },
  ];

  // YouTube videos
  const videos = [
    {
      id: "v1",
      title: "Opening the RAREST Pokémon Cards Box Ever Made!",
      channel: "PokéTuber",
      views: "1.2M views",
      date: "2 weeks ago",
      thumbnail: { uri: 'https://via.placeholder.com/800x400' },
      url: "https://www.youtube.com",
    },
    {
      id: "v2",
      title: "Top 10 Most Valuable Pokémon Cards in 2023",
      channel: "Card Collector",
      views: "850K views",
      date: "1 month ago",
      thumbnail: { uri: 'https://via.placeholder.com/800x400' },
      url: "https://www.youtube.com",
    },
    {
      id: "v3",
      title: "How to Spot FAKE Pokémon Cards - Ultimate Guide",
      channel: "TCG Expert",
      views: "1.5M views",
      date: "3 weeks ago",
      thumbnail: { uri: 'https://via.placeholder.com/800x400' },
      url: "https://www.youtube.com",
    },
  ];

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ExpoStatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'articles' && styles.activeTabButton]} 
          onPress={() => setActiveTab('articles')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'articles' && styles.activeTabText]}>
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'videos' && styles.activeTabButton]} 
          onPress={() => setActiveTab('videos')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'videos' && styles.activeTabText]}>
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'articles' ? (
          <View style={styles.articlesContainer}>
            {newsItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardImageContainer}>
                  <Image source={item.image} style={styles.cardImage} />
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="calendar-outline" size={12} color="#777" style={styles.cardIcon} />
                    <Text style={styles.cardMetaText}>{item.date} • {item.source}</Text>
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardExcerpt}>{item.excerpt}</Text>
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity 
                    style={styles.readMoreButton}
                    onPress={() => handleOpenLink(item.url)}
                  >
                    <Text style={styles.readMoreText}>Read More</Text>
                    <Ionicons name="arrow-forward-outline" size={14} color="#007AFF" style={styles.readMoreIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.videosContainer}>
            {videos.map((video) => (
              <View key={video.id} style={styles.card}>
                <View style={styles.videoThumbnailContainer}>
                  <Image source={video.thumbnail} style={styles.videoThumbnail} />
                  <View style={styles.playButtonOverlay}>
                    <View style={styles.playButton}>
                      <View style={styles.playIcon} />
                    </View>
                  </View>
                </View>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{video.title}</Text>
                  <View style={styles.videoMeta}>
                    <Text style={styles.channelName}>{video.channel}</Text>
                    <Text style={styles.videoStats}>{video.views} • {video.date}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity 
                    style={styles.watchButton}
                    onPress={() => handleOpenLink(video.url)}
                  >
                    <Text style={styles.watchButtonText}>Watch Video</Text>
                    <Ionicons name="arrow-forward-outline" size={14} color="#007AFF" style={styles.watchButtonIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  activeTabButton: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  articlesContainer: {
    padding: 16,
  },
  videosContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImageContainer: {
    position: 'relative',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
  cardHeader: {
    padding: 12,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 4,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#777',
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  cardExcerpt: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  readMoreIcon: {
    marginLeft: 4,
  },
  videoThumbnailContainer: {
    position: 'relative',
    height: 180,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderLeftWidth: 16,
    borderLeftColor: '#FF0000',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelName: {
    fontSize: 12,
    color: '#555',
  },
  videoStats: {
    fontSize: 12,
    color: '#777',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  watchButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  watchButtonIcon: {
    marginLeft: 4,
  },
}); 