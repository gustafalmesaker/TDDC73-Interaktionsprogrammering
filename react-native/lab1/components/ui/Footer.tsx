import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface FooterProps {
  style?: ViewStyle;
  title?: string; // Optional title prop for header text
}

export const Footer: React.FC<FooterProps> = ({ style, title }) => {
  return (
    <View style={[styles.Footer, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  Footer: {
    height: 1,
    width: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:20
  },
});
