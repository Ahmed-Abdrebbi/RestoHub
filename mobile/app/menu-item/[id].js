import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMenuItemById, getMenuItems } from '../../services/menuService';
import { useMenuStore } from '../../store/useMenuStore';
import { useCartStore } from '../../store/useCartStore';

export default function MealDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const addToCart = useCartStore((s) => s.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  const [options, setOptions] = useState({
    cheese: true,
    bacon: true,
    onions: false,
    jalapeno: false,
    truffle: false,
  });

  const optionPrices = {
    cheese: 0.50,
    bacon: 1.50,
    onions: 0.75,
    jalapeno: 0.50,
    truffle: 1.00,
  };

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      // First check cached items in store
      const cached = useMenuStore.getState().items.find((i) => (i.id || i._id) === id);
      if (cached) {
        setItem(cached);
        setLoading(false);
        return;
      }

      // Fetch from API
      try {
        const data = await getMenuItemById(id);
        const fetchedItem = data.item || data.data || data;
        if (fetchedItem && (fetchedItem.name || fetchedItem.id)) {
          setItem(fetchedItem);
          return;
        }
      } catch (err) {
        // Fallback to getMenuItems if single endpoint fails
        const allData = await getMenuItems();
        const items = allData.items || [];
        const found = items.find((i) => (i.id || i._id) === id);
        if (found) {
          setItem(found);
          return;
        }
      }
    } catch (err) {
      console.log('Error fetching item details:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const basePrice = item?.price != null ? Number(item.price) : 14.99;
  const optionsTotal = Object.entries(options).reduce((sum, [key, isChecked]) => {
    return sum + (isChecked ? (optionPrices[key] || 0) : 0);
  }, 0);
  const unitPrice = basePrice + optionsTotal;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(
      {
        id: item?.id || item?._id || id,
        title: item?.name || item?.title || 'Cheesy Bacon Burger Deluxe',
        name: item?.name || item?.title || 'Cheesy Bacon Burger Deluxe',
        price: unitPrice,
        image: item?.image || null,
        subtitle: `${item?.category || 'Chef Special'} • Custom options`,
      },
      quantity
    );
    router.push('/(tabs)/cart');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  const title = item?.name || item?.title || 'Cheesy Bacon Burger Deluxe';
  const description = item?.description || 'Two flame-grilled 100% prime beef patties layered with crispy smoked bacon, melted aged cheddar, crisp romaine lettuce, ripe vine...';

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Detail View</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconCircle}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileCircle}>
            <Ionicons name="person" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {item?.image ? (
          <Image 
            source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
            style={styles.burgerImage}
            resizeMode="cover"
          />
        ) : (
          <Image 
            source={require('../../assets/burger pic.png')} 
            style={styles.burgerImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.imageOverlayTop}>
          <TouchableOpacity style={styles.overlayIconBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={18} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayIconBtn}>
            <Ionicons name="heart" size={18} color="#FF6B00" />
          </TouchableOpacity>
        </View>
        <View style={styles.chefSpecialBadge}>
          <Text style={styles.chefSpecialText}>● {item?.category ? item.category.toUpperCase() : "CHEF'S SPECIAL"}</Text>
        </View>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyPlusBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBadge}>
          <Ionicons name="flame-outline" size={14} color="#FF6B00" />
          <Text style={styles.metaText}>{item?.calories || '650'} kcal</Text>
        </View>
        <View style={styles.metaBadge}>
          <Ionicons name="star" size={14} color="#FFA500" />
          <Text style={styles.metaText}>{item?.rating || '4.9'} (128)</Text>
        </View>
        <View style={styles.metaBadge}>
          <Ionicons name="time-outline" size={14} color="#AAA" />
          <Text style={styles.metaText}>15-20 min</Text>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Description</Text>
      <Text style={styles.descriptionText}>
        {description}{' '}
        <Text style={styles.readMore}>Read More</Text>
      </Text>

      <Text style={styles.sectionHeading}>Additional options</Text>
      <Text style={styles.subHeading}>CUSTOMIZE YOUR MEAL</Text>

      {[
        { key: 'cheese', title: 'Extra Aged Cheddar Cheese', subtitle: 'Sharp & melted', price: '+$0.50' },
        { key: 'bacon', title: 'Crispy Smoked Bacon Strips', subtitle: 'Applewood double-smoked', price: '+$1.50' },
        { key: 'onions', title: 'Caramelized Balsamic Onions', subtitle: 'Slow-cooked sweet savory', price: '+$0.75' },
        { key: 'jalapeno', title: 'Jalapeño Pepper Relish', subtitle: 'Spicy kick', price: '+$0.50' },
        { key: 'truffle', title: 'Truffle Garlic Mayo Dip', subtitle: 'Rich black winter truffle', price: '+$1.00' },
      ].map((opt) => {
        const isChecked = options[opt.key];
        return (
          <TouchableOpacity 
            key={opt.key} 
            style={[styles.optionCard, isChecked && styles.optionCardActive]}
            onPress={() => toggleOption(opt.key)}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Ionicons name="checkmark" size={12} color="#FFF" />}
              </View>
              <View>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.optionPrice}>{opt.price}</Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.footerBar}>
        <View>
          <Text style={styles.totalPriceLabel}>TOTAL PRICE</Text>
          <Text style={styles.totalPriceValue}>${totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ShareIcon() {
  return <Ionicons name="share-social-outline" size={16} color="#FFF" />;
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
    marginBottom: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerActions: {
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
  imageContainer: {
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1B1B1B',
    marginBottom: 16,
    position: 'relative',
  },
  burgerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overlayIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefSpecialBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  chefSpecialText: {
    color: '#FF6B00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 12,
  },
  qtyBtn: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  qtyPlusBtn: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FF6B00',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    overflow: 'hidden',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
    metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 6,
  },
  metaText: {
    color: '#DDD',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeading: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeading: {
    color: '#777',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  descriptionText: {
    color: '#888',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  readMore: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 10,
  },
  optionCardActive: {
    borderColor: '#FF6B00',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  optionTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  optionSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  optionPrice: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: 'bold',
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#1B1B1B',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  totalPriceLabel: {
    color: '#777',
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalPriceValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartBtn: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  }
});