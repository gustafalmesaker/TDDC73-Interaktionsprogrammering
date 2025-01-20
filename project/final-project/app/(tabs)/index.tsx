import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ShoppingCart from '@/sdk/ShoppingCart';
import Carousel from '@/sdk/Carousel';

const storeItems = Array.from({ length: 16 }, (_, i) => ({ //the items in our list
  id: `${i + 1}`,
  name: `Item ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
}));

export default function HomeScreen() {
  //cartItems state variable to keep track of items, setCartItems is func to update cartItems
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number }[]>([]);
  
  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        alert(`The item "${item.name}" is already in the cart.`);
        return prevItems; // Return the existing cart without changes
      }
      return [...prevItems, item]; // Add the new item to the cart
    });
  };
  

  return ( 
    <View style={{ flex: 1 , flexDirection: 'column', justifyContent:'space-around'}}>
      <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 10,}}>
        <ShoppingCart items={cartItems} showItems={true} size="large"/>
      </View>      
      <Carousel data={storeItems} onItemPress={addToCart} theme="light" itemsPerRow={3} scrollBehaviour="buttons" />
      <Carousel data={storeItems} onItemPress={addToCart} />
    </View>
  );
}
