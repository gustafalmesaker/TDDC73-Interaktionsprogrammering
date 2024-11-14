// Empty.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface EmptyProps {
  style?: ViewStyle; 
}

export const Empty: React.FC<EmptyProps> = ({ style }) => {
  return <View style={[styles.empty, style]} />;
};

const styles = StyleSheet.create({
  empty: {
    flex: 1, 
  },
});
