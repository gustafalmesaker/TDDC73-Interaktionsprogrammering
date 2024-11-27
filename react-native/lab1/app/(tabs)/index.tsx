import { Image, StyleSheet, Platform, View } from 'react-native';
import React, { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';  
import { Input } from '@/components/ui/Input';
import { Topper } from '@/components/ui/Topper';
import { Empty } from '@/components/ui/Empty';
import { Footer } from '@/components/ui/Footer';

export default function HomeScreen() {
  const [text, setText] = useState('');

  return (
    <ThemedView style={styles.main}>
      <Topper title='Example 1'/>
      <ThemedView style={styles.mainContent}>
        <ThemedView style={styles.titleContainer}>
          <Image source={require('@/assets/images/circle.png')} style={styles.reactLogo} />
        </ThemedView>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <Button text="Button" onPress={() => console.log("Button 1 Pressed")} />
            <Button text="Button" onPress={() => console.log("Button 2 Pressed")} />
          </View>
          <View style={styles.buttonRow}>
            <Button text="Button" onPress={() => console.log("Button 3 Pressed")} />
            <Button text="Button" onPress={() => console.log("Button 4 Pressed")} />
          </View>
        </View>
        
        <Input placeholder='Write Email Here...' value={text} onChangeText={setText} />
        </ThemedView>
        <Footer></Footer>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    gap: 8,    
  },
  buttonContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around', 
    gap: 8,
    marginVertical: 16,
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,

  },
  reactLogo: {
    height: 100,
    width: 100,
  },
  main:{
    height:800,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between"
  }, 
  mainContent:{
    justifyContent:"space-between",
  } 
  
});
