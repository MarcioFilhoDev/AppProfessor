globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

import './global.css';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/routes';

import { AuthProvider } from './src/contexts/authentication';
import { ExerciciosProvider } from './src/contexts/exercicios';
import { RequsicaoProvider } from './src/contexts/requisicoesContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ExerciciosProvider>
          <RequsicaoProvider>
            <Routes />
          </RequsicaoProvider>
        </ExerciciosProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
