import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './views/Home.js';
import Favorites from './views/Favorites.js';
import About from './views/About.js';
import SplashScreen from './views/SplashScreen.js';
import ContextProvider from './context';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): JSX.Element {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulamos el proceso de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // configuración del tiempo del splash
  }, []);

  // Se crea la navegación y se almacena en un Tab
  const Tab = createBottomTabNavigator();
  // Este es un objeto que nos va a permitir trabajar con diferentes
  // peticiones y poder trabajar con los diferentes Hooks, en este caso useQuery


  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <NavigationContainer>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                  let icon = '';
                  if (route.name === 'Home') {
                    icon = 'home';
                  } else if (route.name === 'Favorite') {
                    icon = 'heart';
                  } else if (route.name === 'About') {
                    icon = 'information';
                  }
                  return <Icon name={icon} size={25} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, //Quitamos la barra del header
              })}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Favorite" component={Favorites} />
              <Tab.Screen name="About" component={About} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
