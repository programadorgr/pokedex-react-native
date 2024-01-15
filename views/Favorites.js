import React, {useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import {FavoritesContext} from '../context';
import {favoritesStyles as styles} from '../styles';

export default function Favorites() {
  const {favorites} = useContext(FavoritesContext);
  return (
    <View style={styles.container}>
      <Header title="Pokédex" description="List of favorite pokemon" />
      <FlatList
        data={favorites}
        renderItem={({item}) => <Card pokemon={item} />}
        numColumns={2}
      />
    </View>
  );
}
