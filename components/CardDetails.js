import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {FavoritesContext} from '../context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorage} from 'reactotron-react-native';
import {cardStyles as styles} from '../styles'; // Renombramos el nombre a styles
import {colors} from '../constants';

export default function Home({pokemon}) {
  const {favorites, updateFavorites} = useContext(FavoritesContext);
  const [isFavorite, setIsfavorite] = useState(false);
  const getPokemon = async ({queryKey}) => {
    const res = await fetch(queryKey[1]);
    return res.json();
  };

  const {isLoading, data, error} = useQuery({
    queryKey: ['getPokemon', pokemon?.url],
    queryFn: getPokemon,
  });

  useEffect(() => {
    async function getStatus() {
      const find = favorites.filter(elm => elm.name === pokemon.name);
      if (find.length > 0) {
        setIsfavorite(true);
      } else {
        setIsfavorite(false);
      }
    }
    getStatus();
  }, [favorites, pokemon.name]);

  const addFavorites = async poke => {
    try {
      // obtenemos los elementos de la lista
      const totalList = await AsyncStorage.getItem('_favorites');

      if (!totalList) {
        const list = [];
        list.push(poke);
        await AsyncStorage.setItem('_favorites', JSON.stringify(list));
        setIsfavorite(true);
      } else {
        const newList = JSON.parse(totalList);
        const find = newList.filter(elm => elm.name === pokemon.name);
        if (find.length === 0) {
          newList.push(poke);
          await AsyncStorage.setItem('_favorites', JSON.stringify(newList));
          setIsfavorite(true);
        } else {
          const newListPokemones = newList.filter(
            elm => elm.name !== pokemon.name,
          );
          await AsyncStorage.setItem(
            '_favorites',
            JSON.stringify(newListPokemones),
          );
          setIsfavorite(false);
        }
      }
      updateFavorites();
    } catch (error) {
      //console.log(error);
    }
  };

  if (error) {
    <View style={styles.container}>
      <Text>Se ha producido un error al cargar el pokémon</Text>
    </View>;
  }

  if (isLoading) {
    <View style={styles.container}>
      <Text>Cargando ...</Text>
    </View>;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors[data?.types[0]?.type?.name]},
      ]}>
      <TouchableOpacity onPress={() => addFavorites(pokemon)}>
        {isFavorite && <Icon name="heart" size={30} color={'#d41b20'} />}
        {!isFavorite && <Icon name="heart-outline" size={30} color={'#FFF'} />}
      </TouchableOpacity>
      {data?.sprites?.other['official-artwork']?.front_default !==
        undefined && (
        <Image
          style={styles.image}
          source={{
            //uri: 'https://pngimg.com/uploads/pokemon/pokemon_PNG93.png',
            uri: data?.sprites?.other['official-artwork']?.front_default,
          }}
        />
      )}

      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.number}>
        {data && (data?.id).toString().padStart(3, '0')}
      </Text>
    </View>
  );
}
