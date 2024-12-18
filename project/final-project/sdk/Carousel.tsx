import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';

type ThemeType = 'light' | 'dark' | 'grey';
type ScrollType = 'scroll' | 'buttons';

interface CarouselProps {
  data: { id: string; name: string; price: number }[];
  theme?: ThemeType;
  itemsPerRow?: number;
  scrollBehaviour?: ScrollType;
  onItemPress: (item: { id: string; name: string; price: number }) => void;
}

const Carousel = ({
  data,
  theme = 'light',
  itemsPerRow = 3,
  scrollBehaviour = 'buttons',
  onItemPress,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const themeStyles = {
    light: {
      backgroundColor: '#f8f8f8',
      textColor: '#000',
    },
    dark: {
      backgroundColor: '#333',
      textColor: '#fff',
    },
    grey: {
      backgroundColor: '#bbb',
      textColor: '#333',
    },
  };

  const currentTheme = themeStyles[theme];

  // Calculate card width dynamically based on itemsPerRow
  const cardWidth = `${100 / itemsPerRow}%`;

  // Pagination logic for "buttons" behavior
  const wrapIndex = (index: number) => (index + data.length) % data.length;

  const visibleData = Array.from({ length: itemsPerRow }, (_, i) =>
    data[wrapIndex(currentIndex + i)]
  );

  const nextPage = () => {
    setCurrentIndex((prevIndex) => wrapIndex(prevIndex + itemsPerRow));
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => wrapIndex(prevIndex - itemsPerRow));
  };

  // Render item for FlatList (scroll behavior)
  const renderItem = ({ item }: { item: { id: string; name: string; price: number } }) => 
  { 
    return (
    <TouchableOpacity
      style={[
        styles.card,
        { paddingLeft: 20, paddingRight: 20, backgroundColor: currentTheme.backgroundColor },
      ]}
      onPress={() => onItemPress(item)}
    >
      <Text style={[styles.cardText, { color: currentTheme.textColor }]}>{item.name}</Text>
      <Text style={[styles.cardText, { color: currentTheme.textColor }]}>${item.price}</Text>
    </TouchableOpacity>
  )};

  if (scrollBehaviour === 'scroll') {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.carouselContainer}
        style={styles.listContainer}
      />
    );
  }

  return (
    <View>
      <View style={styles.carouselContainer}>
        {visibleData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              { width: cardWidth, backgroundColor: currentTheme.backgroundColor },
            ]}
            onPress={() => onItemPress(item)}
          >
            <Text style={[styles.cardText, { color: currentTheme.textColor }]}>{item.name}</Text>
            <Text style={[styles.cardText, { color: currentTheme.textColor }]}>${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={prevPage} style={styles.navButton}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextPage} style={styles.navButton}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    flexGrow: 1,
  },
  card: {
    height: 150,
    marginHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer:{
      
  },
});

export default Carousel;
