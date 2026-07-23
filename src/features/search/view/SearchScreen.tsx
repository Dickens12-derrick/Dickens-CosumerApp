// 
// features/search/view/SearchScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useSearchViewModel } from '../viewmodel/useSearchViewModel';
import { getProductImage, getUiIcon } from '../../../utils/imageMapping';

export default function SearchScreen() {
  const {
    query,
    results,
    recentSearches,
    isSearching,
    showResults,
    onChangeQuery,
    onClearSearch,
    onResultPress,
    onRecentSearchPress,
    onBack,
  } = useSearchViewModel();

  return (
    <View style={styles.container}>
      {/* Search header */}
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          hitSlop={10}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        >
          <Text style={styles.backText}>← Go back</Text>
        </Pressable>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={onChangeQuery}
            placeholder="Search for produce..."
            placeholderTextColor="#9E9E9E"
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={onClearSearch} hitSlop={8}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      {showResults ? (
        /* Search results */
        <ScrollView
          contentContainerStyle={styles.resultsContent}
          keyboardShouldPersistTaps="handled"
        >
          {results.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsSubtitle}>
                Try a different search term
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.resultsCount}>{results.length} result{results.length !== 1 ? 's' : ''}</Text>
              {results.map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.resultItem}
                  onPress={() => onResultPress(product)}
                >
                  <View style={styles.resultImage}>
                    <Image
                      source={getProductImage(product.name, product.category)}
                      style={styles.resultThumbnail}
                    />
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.resultFarmer} numberOfLines={1}>{product.farmer}</Text>
                    <Text style={styles.resultPrice}>
                      UGX {product.price.toLocaleString()}/{product.unit}
                    </Text>
                  </View>
                  <Text style={styles.resultArrow}>›</Text>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView>
      ) : (
        /* Recent searches */
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <View style={styles.recentChips}>
            {recentSearches.map((search) => (
              <Pressable
                key={search}
                style={styles.recentChip}
                onPress={() => onRecentSearchPress(search)}
              >
                <Text style={styles.recentChipText}>🕐 {search}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: '#1B5E20',
    gap: 10,
  },
  backButton: {
    minWidth: 88,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  backButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  backText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1B1B1B',
    paddingVertical: 0,
  },
  clearText: {
    fontSize: 16,
    color: '#9E9E9E',
    paddingLeft: 8,
  },
  // --- Results ---
  resultsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resultsCount: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F6FBF6',
    overflow: 'hidden',
  },
  resultThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  resultFarmer: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
  },
  resultPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
    marginTop: 2,
  },
  resultArrow: {
    fontSize: 20,
    color: '#C8E6C9',
    fontWeight: '700',
  },
  // --- No Results ---
  noResults: {
    alignItems: 'center',
    paddingTop: 60,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  // --- Recent ---
  recentSection: {
    padding: 20,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 12,
  },
  recentChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F6FBF6',
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  recentChipText: {
    fontSize: 13,
    color: '#1B1B1B',
  },
});
