import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBook from './(protected)/addlivros';  // Componente onde você está navegando de
import Favorites from './(protected)/favorites';  // Componente de "Favoritos"
import Lidos from './(protected)/lidos';
import Lendo from './(protected)/lendo';
import Ler from './(protected)/ler';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="Favoritos" component={Favorites} />
      <Stack.Screen name="Lidos" component={Lidos} />
      <Stack.Screen name="Lendo" component={Lendo} />
      <Stack.Screen name="Ler" component={Ler} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
