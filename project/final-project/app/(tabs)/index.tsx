import { Image, StyleSheet, View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ShoppingCart from '@/sdk/ShoppingCart';

const storeItems = Array.from({ length: 16 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Item ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
}));

export default function HomeScreen() {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Item 1', price: 10 },
  ]);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    // Check if the item is already in the cart
    if (cartItems.find((cartItem) => cartItem.id === item.id)) {
      Alert.alert('Item already in cart', `${item.name} is already in your cart.`);
      return;
    }

    setCartItems((prevItems) => [...prevItems, item]);
    Alert.alert('Item added to cart', `${item.name} has been added to your cart.`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.topper}>
        <ShoppingCart items={cartItems} />
      </View>

      <View style={styles.gridContainer}>
        <FlatList
          data={storeItems}
          keyExtractor={(item) => item.id}
          numColumns={4} // Number of columns
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => addToCart(item)}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  topper: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  gridContainer: {
    padding: 16,
    marginTop: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
});
