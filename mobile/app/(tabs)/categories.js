import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { getMenuItems } from '../../services/menuService';
import { useMenuStore } from '../../store/useMenuStore';

export default function CategoriesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All Offerings');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const menuItems = useMenuStore((s) => s.items);
  const setMenuItems = useMenuStore((s) => s.setMenuItems);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      const items = data.items || [];
      setMenuItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.log('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const categoryCounts = {};
  (menuItems || []).forEach((item) => {
    const cat = item.category || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const badges = ['★ 4.9', 'Hot', 'Fresh', 'Crispy', 'Smoked', 'Trending', 'Chef Pick'];

  const derivedCategories = Object.keys(categoryCounts).length > 0
    ? Object.entries(categoryCounts).map(([title, count], idx) => ({
        title,
        items: `${count} Item${count > 1 ? 's' : ''}`,
        badge: badges[idx % badges.length],
      }))
    : [
        { title: 'Burgers', items: '0 Items', badge: '★ 4.9' },
        { title: 'Pizza', items: '0 Items', badge: 'Hot' },
        { title: 'Sushi', items: '0 Items', badge: 'Fresh' },
        { title: 'Chicken', items: '0 Items', badge: 'Crispy' },
        { title: 'Grill', items: '0 Items', badge: 'Smoked' },
        { title: 'Shawarma', items: '0 Items', badge: 'Toasted' },
      ];

  const filteredCategories = derivedCategories.filter((cat) => {
    if (searchQuery.trim() === '') return true;
    return cat.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.headerIconsRow}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="search" size={16} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileCircle}>
            <Ionicons name="person" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#777" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search culinary cravings..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
        {['All Offerings', "Chef's Choice", 'Most Popular', 'Late Night'].map((filter) => (
          <TouchableOpacity 
            key={filter} 
            style={[styles.filterChip, selectedFilter === filter && styles.activeFilterChip]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
              {filter === 'All Offerings' && '• '}
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Explore Menu</Text>
          <Text style={styles.sectionSubtitle}>{filteredCategories.length} curated culinary collections</Text>
        </View>
        <View style={styles.trendingBadge}>
          <Ionicons name="flame" size={12} color="#FF6B00" />
          <Text style={styles.trendingText}>Trending</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B00" style={{ marginVertical: 30 }} />
      ) : (
        <View style={styles.gridContainer}>
          {filteredCategories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => {
                const itemInCat = (menuItems || []).find((m) => (m.category || '').toLowerCase() === cat.title.toLowerCase());
                if (itemInCat) {
                  router.push(`/menu-item/${itemInCat.id || itemInCat._id}`);
                } else {
                  router.push('/(tabs)/home');
                }
              }}
            >
              <View style={styles.cardImagePlaceholder}>
                <View style={styles.badgeBox}>
                  <Text style={styles.badgeText}>{cat.badge}</Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardTitle}>{cat.title}</Text>
                  <Text style={styles.cardItems}>{cat.items}</Text>
                </View>
                <View style={styles.arrowIconBox}>
                  <Ionicons name="arrow-forward" size={14} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.aiCard}>
        <View style={styles.aiLeftRow}>
          <View style={styles.backButtonMini}>
            <Ionicons name="chevron-back" size={16} color="#FF6B00" />
          </View>
          <View>
            <View style={styles.aiTitleRow}>
              <Text style={styles.aiTitle}>Can't decide yet?</Text>
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            </View>
            <Text style={styles.aiSubtitle}>Let Chef AI generate...</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.surpriseButton}>
          <Text style={styles.surpriseButtonText}>Surprise ✦</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIconsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2A1A10',
    borderWidth: 1,
    borderColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersRow: {
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeFilterChip: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#777',
    fontSize: 12,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 4,
  },
  trendingText: {
    color: '#FF6B00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardImagePlaceholder: {
    height: 100,
    backgroundColor: '#252525',
    borderRadius: 12,
    marginBottom: 10,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  badgeBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardItems: {
    color: '#777',
    fontSize: 11,
  },
  arrowIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backButtonMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  aiTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  aiSubtitle: {
    color: '#777',
    fontSize: 11,
    marginTop: 2,
  },
  surpriseButton: {
    backgroundColor: '#252525',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  surpriseButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});