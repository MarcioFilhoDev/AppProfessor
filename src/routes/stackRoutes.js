import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Requisicao from '../screens/appScreens/requisicao';
import AppRoutes from './appRoutes';

const Stack = createNativeStackNavigator();

export default function ScreensStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabs" component={AppRoutes} />

      <Stack.Screen name="Requisicao" component={Requisicao} />
    </Stack.Navigator>
  );
}
