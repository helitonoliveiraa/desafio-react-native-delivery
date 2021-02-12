import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/index';

import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import FoodDetails from '../pages/FoodDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <NavigationContainer>
      <App.Navigator initialRouteName="Home">
        <App.Screen
          options={{
            cardStyle: { backgroundColor: currentTheme.colors.primary },
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <App.Screen
          name="MainBottom"
          component={TabRoutes}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <App.Screen
          name="FoodDetails"
          component={FoodDetails}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="arrow-left"
                size={24}
                color={currentTheme.colors.secondary}
                onPress={() => navigation.goBack()}
              />
            ),
            headerLeftContainerStyle: {
              marginLeft: 24,
            },
            headerRight: () => (
              <Icon
                name="heart"
                size={24}
                color={currentTheme.colors.secondary}
              />
            ),
            headerRightContainerStyle: {
              marginRight: 24,
            },
            headerTitle: 'Prato - Massas',
            headerTitleStyle: {
              color: '#fff',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            },
            headerStyle: {
              backgroundColor: currentTheme.colors.primary,
              elevation: 0,
              borderWidth: 0,
              shadowColor: 'transparent',
            },
          })}
        />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
