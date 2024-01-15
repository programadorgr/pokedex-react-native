import React from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';

const SplashScreen = () => {
  const imageScale = new Animated.Value(0.5);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/pokemon.webp')}
        style={[styles.image, {transform: [{scale: imageScale}]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#122a6a',
  },
  image: {
    width: 400,
    height: 144,
  },
});

export default SplashScreen;
