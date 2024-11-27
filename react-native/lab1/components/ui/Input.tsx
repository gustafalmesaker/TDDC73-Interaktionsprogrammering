import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChangeText }) => {
  return (
    
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 8,
  },
});
