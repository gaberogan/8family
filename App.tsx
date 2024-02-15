import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SleepDetailScreen from './src/screens/SleepDetailScreen';
import {Appearance, Image} from 'react-native';

Appearance.setColorScheme('dark');

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerLeft: () => (
    <Image
      source={require('./src/assets/menu.png')}
      style={{width: 30, height: 25, resizeMode: 'contain'}}
    />
  ),
  headerTitle: () => (
    <Image
      source={require('./src/assets/logo.png')}
      style={{width: 100, height: 25, resizeMode: 'contain'}}
    />
  ),
  headerRight: () => (
    <Image
      source={require('./src/assets/home-temp.png')}
      style={{width: 75, height: 30, resizeMode: 'contain'}}
    />
  ),
  headerShadowVisible: false,
  animation: 'none' as const,
};

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: 'rgb(10, 132, 255)',
          background: 'rgb(1, 1, 1)',
          card: 'rgb(0, 0, 0)',
          text: 'rgb(229, 229, 231)',
          border: 'rgb(39, 39, 41)',
          notification: 'rgb(255, 69, 58)',
        },
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={headerOptions}
        />
        <Stack.Screen
          name="SleepDetail"
          component={SleepDetailScreen}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
