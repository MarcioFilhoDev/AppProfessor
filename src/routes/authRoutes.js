import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/authScreens/signIn';
import SignUp from '../screens/authScreens/signUp';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
