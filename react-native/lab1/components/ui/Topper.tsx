import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface TopperProps {
  style?: ViewStyle;
  title?: string; // Optional title prop for header text
}

export const Topper: React.FC<TopperProps> = ({ style, title }) => {
  return (
    <View style={[styles.topper, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  topper: {
    height: 120,
    width: 400,
    backgroundColor: '#00ff59',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:20
  },
});
