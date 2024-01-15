import React from 'react';
import {View, Text} from 'react-native';
import {aboutStyles as styles} from '../styles'; // Renombramos el nombre a styles
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function About() {
  return (
    <View style={styles.container}>
      <Header
        title="About the app"
        description="Built using React Native technology"
      />
      <Text style={styles.parrafo}>Made with  <Icon name="heart" size={30} color={'#d41b20'} /> with Argentina</Text>
    </View>
  );
}
