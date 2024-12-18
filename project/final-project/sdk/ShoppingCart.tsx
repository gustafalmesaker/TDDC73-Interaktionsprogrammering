import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';

type ThemeType = 'light' | 'dark' | 'grey';
type ButtonSize = 'small' | 'medium' | 'large';

interface ShoppingCartProps {
  items: { id: string; name: string; price: number }[];
  theme?: ThemeType;
  showItems?: boolean;
  size?: ButtonSize;
}

const ShoppingCart = ({
  items,
  theme = 'light',
  showItems = true,
  size = 'medium',
}: ShoppingCartProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCart = () => setIsExpanded(!isExpanded);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const themeStyles = {
    light: {
      backgroundColor: '#f8f8f8',
      textColor: '#000',
      borderColor: '#ccc',
    },
    dark: {
      backgroundColor: '#333',
      textColor: '#fff',
      borderColor: '#555',
    },
    grey: {
      backgroundColor: '#bbb',
      textColor: '#333',
      borderColor: '#888',
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <View
      style={[styles.container, { borderColor: currentTheme.borderColor }]}
    >
      <TouchableOpacity
        onPress={toggleCart}
        style={[styles.header, { backgroundColor: currentTheme.backgroundColor }]}
      >
        <Text style={[styles.headerText, { color: currentTheme.textColor }]}>
          Shopping Cart
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View
          style={[
            styles.overlayCart,
            { backgroundColor: currentTheme.backgroundColor },
          ]}
        >
          {items.length === 0 ? (
            <Text style={[styles.emptyText, { color: currentTheme.textColor }]}>
              Your cart is empty.
            </Text>
          ) : (
            <>
              {showItems && (
                <ScrollView style={styles.listOfItems}>
                  {items.map((item) => (
                    <Text
                      key={item.id}
                      style={[styles.item, { color: currentTheme.textColor }]}
                    >
                      {item.name} - ${item.price}
                    </Text>
                  ))}
                </ScrollView>
              )}
              <Text style={[styles.total, { color: currentTheme.textColor }]}>
                Total: ${total}
              </Text>
              <Button title="Proceed To Checkout" onPress={() => {}} />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    position: 'relative',
    zIndex: 10
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlayCart: {
    position: 'absolute',
    top: 52, 
    left: '5%', 
    right: '5%',
    zIndex: 10, 
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 300, 
    width: '90%',
  },
  item: {
    marginVertical: 4,
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
  },
  listOfItems: {
    maxHeight: 200, 
  },
});

export default ShoppingCart;
