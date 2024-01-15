import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const FavoritesContext = createContext();

export default function Provider({children}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function getFavorites() {
      const list = await AsyncStorage.getItem('_favorites');
      if (list) {
        const tmp = JSON.parse(list);
        setFavorites(tmp);
      }
    }

    getFavorites();
  }, []);

  async function updateFavorites() {
    const list = await AsyncStorage.getItem('_favorites');
    if (list) {
      const tmp = JSON.parse(list);
      setFavorites(tmp);
    }
  }
  return (
    <FavoritesContext.Provider
      value={{favorites, setFavorites, updateFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
}
