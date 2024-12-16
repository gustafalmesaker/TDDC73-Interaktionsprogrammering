import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Animated, ImageBackground } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

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
    { key: '01', value: 'January' },
    { key: '02', value: 'February' },
    { key: '03', value: 'March' },
    { key: '04', value: 'April' },
    { key: '05', value: 'May' },
    { key: '06', value: 'June' },
    { key: '07', value: 'July' },
    { key: '08', value: 'August' },
    { key: '09', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
  ];

  const years = [
    { key: '2020', value: '2020' },
    { key: '2021', value: '2021' },
    { key: '2022', value: '2022' },
    { key: '2023', value: '2023' },
    { key: '2024', value: '2024' },
    { key: '2025', value: '2025' },
    { key: '2026', value: '2026' },
    { key: '2027', value: '2027' },
    { key: '2028', value: '2028' },
    { key: '2029', value: '2029' },
    { key: '2030', value: '2030' },
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
    const numericText = text.replace(/[^0-9]/g, '');
    const formattedText = numericText.replace(/(\d{4})(?=\d)/g, '$1 '); 
    setCardNumber(formattedText);
    animate(numberAnimation);
  };
  

  const handleCardNameChange = (text: string) => {
  const nameText = text.replace(/[^a-zA-Z\s]/g, '');
  setCardName(nameText);
  animate(nameAnimation);
};

  const handleMonthChange = (value: string) => {
    setMonth(value);
    animate(dateAnimation);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    animate(dateAnimation);
  };

  const handleCVVChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 4) {
      setCVV(numericText);
      animate(numberAnimation);
    }
  };

  const maskedCardNumber = () => {
    return cardNumber.padEnd(16, '#');
    //return cardNumber.padEnd(16, '#').replace(/(.{4})(?=.)/g, '$1 ');
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
        {focusedField === 'CVV' && (
          <View style={styles.magneticStrip}></View>
        )}
        <Image
          source={require('@/assets/images/chip.png')}
          style={focusedField === 'CVV' ? styles.hidden : styles.smallImageTopLeft}
        />
        <Image
          source={require('@/assets/images/visa.png')}
          style={focusedField === 'CVV' ? styles.hidden : styles.smallImageTopRight}
        />
        <Image style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardDetails}>
          <Animated.Text
            style={[styles.cardNumber, { transform: [{ scale: numberAnimation }] }, borderStyle('cardNumber')]}
          >
            {focusedField === 'CVV'
            ? <View style={styles.CVVContainer}>
                <Text style={styles.CVVText}> {CVV || 'xxxx'} </Text>
              </View>
            : maskedCardNumber()}
          </Animated.Text>
          <View style={styles.cardInfo}>
            <View style={focusedField === 'CVV' ? styles.hidden : styles.column}>
              <Text style={styles.cardText}>Card Holder</Text>
              <Animated.Text
                style={[styles.cardHolder, { transform: [{ scale: nameAnimation }] }, borderStyle('cardName')]}
              >
                {cardName || 'Card Holder'}
              </Animated.Text>
            </View>
            <View style={focusedField === 'CVV' ? styles.hidden : styles.column} >
              <Text style={styles.cardText}>Expires</Text>
              <Animated.Text
                style={[styles.expiryDate, { transform: [{ scale: dateAnimation }] }, borderStyle('expiryDate')]}
              >
                {`${month || 'MM'}/${year || 'YY'}`}
              </Animated.Text>
            </View>
            <View style={focusedField === 'CVV' ? styles.rowReverse : styles.hidden}>
            <Image
              source={require('@/assets/images/visa.png')}
              style={focusedField === 'CVV' ? styles.smallImageBottomRight : styles.hidden}/>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.form}>
        <View style={styles.column}>
          <Text style={[styles.cardText , styles.InputLabel]}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            onFocus={() => handleInputFocus('cardNumber')}
            onBlur={handleInputBlur}
            onChangeText={handleCardNumberChange}
            value={cardNumber}
            maxLength={19}
          />
        </View>
        <View style={styles.column}>
          <Text style={[styles.cardText , styles.InputLabel]}>Card Holder</Text>
          <TextInput
            style={styles.input}
            placeholder="Name Lastname"
            onFocus={() => handleInputFocus('cardName')}
            onBlur={handleInputBlur}
            onChangeText={handleCardNameChange}
            maxLength={24}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.cardText}>Month</Text>
            <SelectList
              setSelected={(value: React.SetStateAction<string>) => setMonth(value)}
              data={months}
              placeholder="Month"
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.cardText}>Year</Text>
            <SelectList
              setSelected={(value: React.SetStateAction<string>) => setYear(value)}
              data={years}
              placeholder="Year"
              search={false}
              boxStyles={styles.selectBox}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.cardText}>CVV</Text>
            <TextInput
              style={[styles.input, styles.halfInput, styles.inputCVV]}
              placeholder="CVV"
              maxLength={4}
              keyboardType="numeric"
              onFocus={() => handleInputFocus('CVV')}
              onBlur={handleInputBlur}
              onChangeText={handleCVVChange}
            />  
          </View>
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
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 30,
    position: 'absolute',
    marginTop: 100,
    zIndex: 2,
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
  InputLabel: {
    textAlign:'left',
    marginLeft: 5
  },
  expiryDate: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
  },
  form: {
    width: '100%',
    marginTop: 175,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 120,
    borderRadius: 10,
    zIndex: 1
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    color:'black'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },rowReverse: {
    flexDirection: 'row-reverse',
    width:300
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
  smallImageBottomRight: {
    width: 65,
    height: 40,
  },
  
  hidden: {
    display: 'none'
  },
  selectBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    height: 50,
    width: 100
  },
  inputCVV: {
    height: 50,
    width: 100,
    textAlign:'center'
  },
  CVVContainer: {
    width: 500,
    height:40,
    backgroundColor: '#FFF',
    justifyContent:'center'
  },
  CVVText: {
    color: 'black',
    textAlign:'right',
    fontSize: 14
  },
  magneticStrip: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'black',
  },
});