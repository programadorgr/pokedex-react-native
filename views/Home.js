/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View, FlatList, RefreshControl, StyleSheet, Text} from 'react-native';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import Header from '../components/Header';
import Card from '../components/Card';
import CardDetails from '../components/CardDetails';
import Error from '../components/Error';
import {homeStyles as styles} from '../styles';
import {GET_ALL_URL, SEARCH_URL} from '../constants';

export default function Home() {

// Establecemos variables de estado para manejar la búsqueda
const [tmp, setTmp] = useState('');
const [search, setSearch] = useState(null);

let pageParam = 0;

const getAllPokemon = async () => {
  try {
    const response = await fetch(GET_ALL_URL);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  } 
}

const getPokemon = async ({queryKey}) => {

  // Comprobamos que el 1er caracter no sea 0
  let parametro = "";
  if (queryKey[1] &&  queryKey[1].charAt(0) === '0' ) {
    parametro = queryKey[1].substring(1,5); // 01022 -> 1022
  } else if  (queryKey[1].charAt(0) === '1') {
    parametro = queryKey[1].substring(0,5).toLowerCase();
  } else {
    parametro = queryKey[1].substring(0,20).toLowerCase();
  }
  const url_search = `${SEARCH_URL}/${parametro}`;
  const res = await fetch(url_search);
  return res.json();
};

const {
  isLoading: searchLoading,
  isFetching: searchFetching,
  //isError, 
  data: searchResult,
  error:  searchError,
} = useQuery({
  queryKey: ['getPokemon', search],
  queryFn: getPokemon, enabled: !!search,
});

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ['getAllPokemon'],
    queryFn: getAllPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Pokédex"
        description="Collection of Pokémon characters"
        showSearch={true}
        tmp={tmp}
        setTmp={setTmp}
        setSearch={setSearch}
      />

      {
        !search && (
          <FlatList
          data={data?.pages.map(page => page.results).flat()} //creamos un objeto flat, lo que hace flat tomar todos estos array y convetirlo en uno sólo para que flatlist lo entienda de manera sencilla
          renderItem={({item}) => <Card pokemon={item} />}
          numColumns={2}
          onEndReached={loadMore} // Alcanzamos nuestro límite máximo del flatlist, que tiene que hacer
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={isLoading || isFetching}
              size="large"
              tintColor="#1b1b"
            />}
          refreshing={searchLoading || searchFetching}
          onRefresh={refetch}
      />
      )}
      { searchResult && (
        <Card pokemon={{url: `${SEARCH_URL}/${searchResult.id}`}} />
      )}
      { (searchLoading || searchFetching || isLoading || isFetching) && <Text>Searching ...</Text>}
      { searchError && <Error tipo={'notfound'} mensaje={'Pokémon not found'}></Error> }
      { error && <Text>An error has occurred</Text> }
    </View>
  );
}
