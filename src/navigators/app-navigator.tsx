import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NetworkLogger from 'react-native-network-logger';
// app screens
import Home from '../screens/home';
import Cart from '../screens/cart';
import Product from '../screens/product';

// others
import {stackNavigationOptions} from './navigator-options';
import {AppNavigatorRouteParamList} from '../types/navigator';

const AppStackNavigator = createStackNavigator<AppNavigatorRouteParamList>();

export default function AppNavigator() {
  return (
    <AppStackNavigator.Navigator
      screenOptions={stackNavigationOptions}
      initialRouteName="Home">
      <AppStackNavigator.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <AppStackNavigator.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <AppStackNavigator.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
      <AppStackNavigator.Screen
        name="NetworkLogger"
        component={NetworkLogger}
        options={{headerShown: false}}
      />
    </AppStackNavigator.Navigator>
  );
}
