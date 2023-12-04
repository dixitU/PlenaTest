import {NavigationProp, ParamListBase} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';

export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export type AppNavigatorRouteParamList = {
  Home: undefined;
  Product: {
    id: number;
  };
  Cart: undefined;
  NetworkLogger: undefined;
};

export type AppNavigatorProps = NavigationProp<AppNavigatorRouteParamList>;

export type AppNavigatorScreenRoute<
  ScreenName extends keyof AppNavigatorRouteParamList,
> = StackScreenProps<AppNavigatorRouteParamList, ScreenName>['route'];
