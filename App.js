globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import './global.css';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/routes';

import { AuthProvider } from './src/contexts/authentication';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
