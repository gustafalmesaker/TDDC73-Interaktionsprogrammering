import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const renderHeaderContent = () => {
    if (size === 'small') {
      return <Ionicons name="cart-outline" size={24} color={currentTheme.textColor} />;
    }
    if (size === 'medium') {
      return <Text style={[styles.headerText, { color: currentTheme.textColor }]}>Shopping Cart</Text>;
    }
    if (size === 'large') {
      return (
        <View style={styles.headerLarge}>
          <Ionicons name="cart-outline" size={24} color={currentTheme.textColor} />
          <Text style={[styles.headerText, { color: currentTheme.textColor }]}>Shopping Cart</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { borderColor: currentTheme.borderColor }]}>
      <TouchableOpacity
        onPress={toggleCart}
        style={[styles.header, { backgroundColor: currentTheme.backgroundColor }]}
      >
        {renderHeaderContent()}
        
      </TouchableOpacity>

      {isExpanded && (
        <View style={[styles.overlayWrapper, size === 'small' ? { minWidth: 150, left: -75} : {}]}>
          <View
            style={[
              styles.overlayCart,
              { backgroundColor: currentTheme.backgroundColor, borderColor: currentTheme.borderColor},
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
    zIndex: 2,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overlayWrapper: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayCart: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: '5%', 
    zIndex: 9999,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 300,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 2,
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
  smallButtonContainer: {
    width: 150
  }
});
export default ShoppingCart;