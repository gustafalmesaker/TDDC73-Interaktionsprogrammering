import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  data: { id: string; name: string; price: number }[]; // Items for the carousel
  onItemPress: (item: { id: string; name: string; price: number }) => void; // Function to handle item press
}

const Carousel = ({ data, onItemPress }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const itemsPerSlide = 4;

  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  const handleScrollToIndex = (index: number) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      x: screenWidth * index,
      animated: true,
    });
  };

  const onMomentumScrollEnd = (e: any) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}>
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <View key={slideIndex} style={[styles.carouselSlide, { width: screenWidth }]}>
            {data
              .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
              .map((item) => (
                <View key={item.id} style={styles.carouselItem}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => onItemPress(item)}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
            onPress={() => handleScrollToIndex(index)}
          />
        ))}
      </View>

      {/* Side Indicators */}
      <View style={styles.sideIndicatorContainer}>
        {currentIndex > 0 && (
          <TouchableOpacity
            onPress={() => handleScrollToIndex(currentIndex - 1)}
            style={styles.leftIndicator}>
            <Text style={styles.indicatorText}>‹</Text>
          </TouchableOpacity>
        )}
        {currentIndex < totalSlides - 1 && (
          <TouchableOpacity
            onPress={() => handleScrollToIndex(currentIndex + 1)}
            style={styles.rightIndicator}>
            <Text style={styles.indicatorText}>›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginVertical: 16,
  },
  carouselSlide: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#007BFF',
  },
  sideIndicatorContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  leftIndicator: {
    position: 'absolute',
    left: 10,
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 16,
  },
  rightIndicator: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 16,
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  carouselWrapper: {
    zIndex: 0
  }
});

export default Carousel;
    