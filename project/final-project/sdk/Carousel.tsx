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

  const screenWidth = Dimensions.get('window').width;


  const cardWidth = (screenWidth * 0.9 )/ itemsPerRow - 8; // Subtracting margin for spacing, 0.9 used for buttonspace on the sides

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

  const renderItem = ({ item }: { item: { id: string; name: string; price: number } }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { width: cardWidth, backgroundColor: currentTheme.backgroundColor },
      ]}
      onPress={() => onItemPress(item)}
    >
      <Text style={[styles.cardText, { color: currentTheme.textColor }]}>{item.name}</Text>
      <Text style={[styles.cardText, { color: currentTheme.textColor }]}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (scrollBehaviour === 'scroll') {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 8,
          alignItems: 'center',
        }}
        showsHorizontalScrollIndicator={true}
        snapToInterval={cardWidth + 8}
        snapToAlignment="center"
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: cardWidth + 8,
          offset: (cardWidth + 8) * index,
          index,
        })}
      />
    );
  }


  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={prevPage} style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>
        </View>
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
      <View style={styles.buttonContainer}>
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
    marginHorizontal: 16,
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
    borderRadius: 4,
    height: 75,
    backgroundColor: '#ddd',
    justifyContent:'center'
    
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    textAlignVertical: 'center',
  },
  container: {
    flexDirection: 'row',
    width:'100%',
    justifyContent:'space-evenly'
  },
  buttonContainer: {
    justifyContent: 'center',
    width: 50
  }
});
export default Carousel;
