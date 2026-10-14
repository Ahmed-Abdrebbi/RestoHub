import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <View style={styles.miniDot} />
          <Text style={styles.brandText}>Smart Menu</Text>
        </View>
        <TouchableOpacity style={styles.profileIconBox}>
          <Ionicons name="person" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.greetingText}>What meal do you want?</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#777" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search delicious food..."
            placeholderTextColor="#777"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerCard}>
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>★ OUR BEST SELLER</Text>
        </View>
        <View style={styles.bannerContent}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Double Beef Burger Deluxe</Text>
            <Text style={styles.bannerSubtitle}>Get 20% off on your first order!</Text>
            <TouchableOpacity style={styles.orderNowButton}>
              <Text style={styles.orderNowText}>Order now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../assets/image_72e9ff.png')} 
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See more &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
        {[
          { name: 'Burger', icon: 'hamburger', active: true, count: '24 items' },
          { name: 'Pizza', icon: 'pizza', active: false, count: '18 items' },
          { name: 'Chicken', icon: 'drumstick', active: false, count: '12 items' },
          { name: 'Salad', icon: 'utensils', active: false, count: '10 items' },
          { name: 'Drinks', icon: 'glass-martini-alt', active: false, count: '20 items' },
        ].map((cat, index) => (
          <TouchableOpacity key={index} style={[styles.categoryCard, cat.active && styles.activeCategoryCard]}>
            <View style={[styles.categoryIconBox, cat.active && styles.activeCategoryIconBox]}>
              <FontAwesome5 name={cat.icon} size={18} color={cat.active ? '#FF6B00' : '#888'} />
            </View>
            <Text style={[styles.categoryName, cat.active && styles.activeCategoryName]}>{cat.name}</Text>
            <Text style={styles.categoryCount}>{cat.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Meals</Text>
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>See more &gt;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mealsGrid}>
        {[
          { title: 'Cheesy Bacon Bur...', price: '$12.99', rating: '4.7', reviews: '(230)' },
          { title: 'Rustic Pepperoni', price: '$15.50', rating: '4.8', reviews: '(110)' },
          { title: 'Crispy Chicken Ten...', price: '$10.99', rating: '4.9', reviews: '(210)' },
          { title: 'Greek Avocado Sal...', price: '$9.50', rating: '4.7', reviews: '(75)' },
        ].map((meal, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.mealCard}
            onPress={() => router.push(`/menu-item/${index}`)}
          >
            <View style={styles.mealImagePlaceholder}>
              <Ionicons name="heart-outline" size={16} color="#FFF" style={styles.heartIcon} />
            </View>
            <Text style={styles.mealTitle} numberOfLines={1}>{meal.title}</Text>
            <View style={styles.mealRatingRow}>
              <Ionicons name="star" size={12} color="#FFA500" />
              <Text style={styles.mealRatingText}>{meal.rating}</Text>
              <Text style={styles.mealReviewsText}>{meal.reviews}</Text>
            </View>
            <View style={styles.mealFooter}>
              <Text style={styles.mealPrice}>{meal.price}</Text>
              <View style={styles.plusButton}>
                <Ionicons name="add" size={16} color="#FFF" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
    marginRight: 6,
  },
  brandText: {
    color: '#CCC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  bannerCard: {
    backgroundColor: '#FF7A00',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },
  bannerBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 12,
  },
  orderNowButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  orderNowText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 90,
    height: 90,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  activeDot: {
    width: 16,
    backgroundColor: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesRow: {
    gap: 10,
    marginBottom: 20,
  },
  categoryCard: {
    width: 70,
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeCategoryCard: {
    backgroundColor: '#1B1B1B',
    borderColor: '#FF6B00',
  },
  categoryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  activeCategoryIconBox: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
  },
  categoryName: {
    color: '#888',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  activeCategoryName: {
    color: '#FFF',
  },
  categoryCount: {
    color: '#555',
    fontSize: 9,
  },
  mealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  mealCard: {
    width: '48%',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 8,
  },
  mealImagePlaceholder: {
    height: 90,
    backgroundColor: '#252525',
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 6,
  },
  heartIcon: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 4,
    borderRadius: 10,
  },
  mealTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealRatingText: {
    color: '#DDD',
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '600',
  },
  mealReviewsText: {
    color: '#777',
    fontSize: 10,
    marginLeft: 4,
  },
  mealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealPrice: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  plusButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});