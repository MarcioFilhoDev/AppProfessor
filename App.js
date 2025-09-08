import './global.css'

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/routes';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
