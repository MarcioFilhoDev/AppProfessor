import React from 'react';

import Home from '../screens/appScreens/home';
import Perfil from '../screens/appScreens/perfil';

const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');

const Tabs = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />

      <Tabs.Screen name="Perfil" component={Perfil} />
    </Tabs.Navigator>
  );
}
