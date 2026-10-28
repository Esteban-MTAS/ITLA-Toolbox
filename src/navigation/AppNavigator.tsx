import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, modules } from './routes';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import GenderScreen from '../screens/GenderScreen';
import RandomUserScreen from '../screens/RandomUserScreen';
import UniversitiesScreen from '../screens/UniversitiesScreen';
import WeatherScreen from '../screens/WeatherScreen';
import PokemonScreen from '../screens/PokemonScreen';
import NewsScreen from '../screens/NewsScreen';
import AboutScreen from '../screens/AboutScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
const screens = {
  Gender: GenderScreen,
  RandomUser: RandomUserScreen,
  Universities: UniversitiesScreen,
  Weather: WeatherScreen,
  Pokemon: PokemonScreen,
  News: NewsScreen,
  About: AboutScreen,
};
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.navy },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ITLA Toolbox' }}
        />
        {modules.map(item => (
          <Stack.Screen
            key={item.route}
            name={item.route}
            component={screens[item.route]}
            options={{ title: item.title }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
