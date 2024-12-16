import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';

const ShoppingCart = ({ items }: { items: { id: string; name: string; price: number }[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCart = () => setIsExpanded(!isExpanded);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCart} style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.cart}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.name} - ${item.price}</Text>
            )}
          />
          <Text style={styles.total}>Total: ${total}</Text>
          <Button title='Proceed To Checkout'></Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: 150 },
  header: { padding: 16, backgroundColor: '#f8f8f8' },
  headerText: { fontWeight: 'bold', fontSize: 16 },
  cart: { padding: 16 },
  item: { marginVertical: 4 },
  total: { marginTop: 8, fontWeight: 'bold', textAlign: 'right' },
  ProceedButton: {marginTop: 16},
  
});

export default ShoppingCart;
