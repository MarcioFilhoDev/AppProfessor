import React from 'react';

// Telas do aplicativo
import Home from '../screens/appScreens/home';
import Perfil from '../screens/appScreens/perfil';
import Treinos from '../screens/appScreens/treinos';

import ScreensStack from '../routes/stackRoutes';

// Biblioteca de icones
import Lucide from '@react-native-vector-icons/lucide';

// Constante de cores
import { colors } from '../constants/colors';

const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');

const Tabs = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="Treinos"
        component={Treinos}
        options={{
          tabBarIcon: ({ color }) => (
            <Lucide name="biceps-flexed" color={color} size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Lucide name="house" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => (
            <Lucide name="user" color={color} size={30} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
