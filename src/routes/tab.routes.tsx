import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import { lighten } from 'polished';
import Dashboard from '../pages/Dashboard';
import Favorites from '../pages/Favorites';
import Orders from '../pages/Orders';
import { useTheme } from '../context/index';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelPosition: 'beside-icon',
        activeBackgroundColor: currentTheme.colors.background,
        inactiveBackgroundColor: lighten(0.2, currentTheme.colors.background),
        activeTintColor: currentTheme.colors.negative,
        labelStyle: {
          fontFamily: currentTheme.fonts['Poppins-Regular'],
          fontSize: 12,
          fontWeight: '600',
        },
        style: {
          borderTopColor: currentTheme.colors.background,
        },
        inactiveTintColor: currentTheme.colors.inputs,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="list" color={color} />
          ),
          title: 'Listagem',
        }}
        name="DashboardStack"
        component={Dashboard}
      />
      <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="shopping-bag" color={color} />
          ),
          title: 'Pedidos',
        }}
        component={Orders}
      />

      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="heart" color={color} />
          ),
          title: 'Favoritos',
        }}
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
