import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ShoppingCart from '@/sdk/ShoppingCart';
import Carousel from '@/sdk/Carousel';

const storeItems = Array.from({ length: 16 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Item ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
}));

export default function HomeScreen() {
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number }[]>([]);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCartItems((prevItems) => [...prevItems, item]);
    Alert.alert('Item added to cart', `${item.name} has been added to your cart.`);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row-reverse' }}> 
        <ShoppingCart items={cartItems} theme="dark" showItems={true} size='medium'/>
      </View>
      <View style={{height:150}}/>
      <Carousel data={storeItems} onItemPress={addToCart} theme='dark' itemsPerRow={5} scrollBehaviour='scroll'/>
      <View style={{height:150}}/>
      <Carousel data={storeItems} onItemPress={addToCart} itemsPerRow={5} />
    </View>
  );
}
