import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Animated, ImageBackground } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';


export default function HomeScreen() {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [CVV, setCVV] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [numberAnimation] = useState(new Animated.Value(1));
  const [nameAnimation] = useState(new Animated.Value(1));
  const [dateAnimation] = useState(new Animated.Value(1));

  const months = [
    { key: '1', value: 'January' },
    { key: '2', value: 'February' },
    { key: '3', value: 'March' },
    { key: '4', value: 'April' },
    { key: '5', value: 'May' },
    { key: '6', value: 'June' },
    { key: '7', value: 'July' },
    { key: '8', value: 'August' },
    { key: '9', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
  ];

  const years = [
    { key: '1', value: '2020' },
    { key: '2', value: '2021' },
    { key: '3', value: '2022' },
    { key: '4', value: '2023' },
    { key: '5', value: '2024' },
  ];


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

  const handleCVVChange = (text: string) => {
    setCVV(text);
    animate(numberAnimation);
  };


  const handleMonthChange = (value: string) => {
    setMonth(value);
    animate(dateAnimation);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
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
        source={
          focusedField === 'CVV'
            ? require('@/assets/images/7.jpeg') 
            : require('@/assets/images/6.jpeg') 
        }
        style={styles.cardContainer}
        imageStyle={{ borderRadius: 12 }}
      >
      
        
        <Image
          source={require('@/assets/images/chip.png')}
          style={
            focusedField === 'CVV'
              ? styles.hidden
              : styles.smallImageTopLeft}
        />
        <Image
          source={require('@/assets/images/visa.png')}
          style={
            focusedField === 'CVV'
              ? styles.hidden
              : styles.smallImageTopRight}
        />
        
        
        <Image style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardDetails}>
          <Animated.Text
            style={[styles.cardNumber, { transform: [{ scale: numberAnimation }] }, borderStyle('cardNumber')]}
          >
            {maskedCardNumber()}
          </Animated.Text>
          <View style={styles.cardInfo}>
            <View style={styles.column}>
              <Text style={styles.cardText}>Card Holder</Text>
              <Animated.Text
                style={[styles.cardHolder, { transform: [{ scale: nameAnimation }] }, borderStyle('cardName')]}
              >
                {cardName || 'Card Holder'}
              </Animated.Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.cardText}>Expires</Text>
              <Animated.Text
                style={[styles.expiryDate, { transform: [{ scale: dateAnimation }] }, borderStyle('expiryDate')]}
              >
                {`${month.padEnd(2, 'M')}/${year.padEnd(2, 'Y')}`}
              </Animated.Text>
            </View>
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
          placeholder="Card Holder"
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
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            keyboardType="numeric"
            onFocus={() => handleInputFocus('CVV')}
            onBlur={handleInputBlur}
            onChangeText={handleCVVChange}
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
    paddingTop: 50,
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
    height: 80,
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
    padding: 5,
    textAlign: 'center',
  },
  cardText: {
    color: '#A9A9A9',
    fontSize: 11,
    textAlign: 'center',
  },
  expiryDate: {
    color: '#FFF',
    fontSize: 14,
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
  column: {
    flexDirection: 'column'
  },
  halfInput: {
    width: '30%',
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
  smallImageTopLeft: {
    position: 'absolute',
    top: 25,
    left: 25,
    width: 55,
    height: 40,
    borderRadius: 6,
  },
  smallImageTopRight: {
    position: 'absolute',
    top: 25,
    right: 25,
    width: 65,
    height: 40
  },
  hidden: {
    display: 'none'
  }
});