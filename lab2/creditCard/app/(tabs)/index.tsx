import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Animated, ImageBackground } from 'react-native';

export default function HomeScreen() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [focusedField, setFocusedField] = useState<string | null>(null); 

  const [numberAnimation] = useState(new Animated.Value(1));
  const [nameAnimation] = useState(new Animated.Value(1));
  const [dateAnimation] = useState(new Animated.Value(1));

  const animate = (animation: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 1.1, duration: 200, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const handleInputFocus = (field: string) => setFocusedField(field);
  const handleInputBlur = () => setFocusedField(null);

  const handleCardNumberChange = (text: string) => {
    if (text.length < 17) {
      setCardNumber(text.slice(0, 16));
      animate(numberAnimation);
    }
  };

  const handleCardNameChange = (text: string) => {
    setCardName(text);
    animate(nameAnimation);
  };

  const handleMonthChange = (text: string) => {
    setMonth(text.slice(0, 2));
    animate(dateAnimation);
  };

  const handleYearChange = (text: string) => {
    setYear(text.slice(0, 2));
    animate(dateAnimation);
  };

  const maskedCardNumber = () => {
    return cardNumber.padEnd(16, '#').replace(/(.{4})(?=.)/g, '$1 ');
  };

  const borderStyle = (field: string) =>
    focusedField === field ? { borderColor: 'white', borderWidth: 1 } : {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/18.jpeg')}
        style={styles.cardContainer}
        imageStyle={{ borderRadius: 12 }}
      >
        <Image source={require('@/assets/images/mastercard.png')} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardDetails}>
          <Animated.Text
            style={[styles.cardNumber, { transform: [{ scale: numberAnimation }] }, borderStyle('cardNumber')]}
          >
            {maskedCardNumber()}
          </Animated.Text>
          <View style={styles.cardInfo}>
            <Animated.Text
              style={[styles.cardHolder, { transform: [{ scale: nameAnimation }] }, borderStyle('cardName')]}
            >
              {cardName || 'Card Holder'}
            </Animated.Text>
            <Animated.Text
              style={[styles.expiryDate, { transform: [{ scale: dateAnimation }] }, borderStyle('expiryDate')]}
            >
              {`${month.padEnd(2, 'M')}/${year.padEnd(2, 'Y')}`}
            </Animated.Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          onFocus={() => handleInputFocus('cardNumber')}
          onBlur={handleInputBlur}
          onChangeText={handleCardNumberChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Card Name"
          onFocus={() => handleInputFocus('cardName')}
          onBlur={handleInputBlur}
          onChangeText={handleCardNameChange}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Month"
            keyboardType="numeric"
            onFocus={() => handleInputFocus('expiryDate')}
            onBlur={handleInputBlur}
            onChangeText={handleMonthChange}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Year"
            keyboardType="numeric"
            onFocus={() => handleInputFocus('expiryDate')}
            onBlur={handleInputBlur}
            onChangeText={handleYearChange}
          />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FC',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#1D3D47',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  cardDetails: {
    marginTop: 10,
    width: '100%',
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 22,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
    padding: 5,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardHolder: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    padding: 5,
    textAlign:'center',
  },
  expiryDate: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    padding: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '45%',
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
