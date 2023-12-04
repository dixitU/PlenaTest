import React from 'react';
import {Appearance, Platform} from 'react-native';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import BackButton from './components/BackButton';

const colorScheme = Appearance.getColorScheme();

export const stackNavigationOptions: <ParamList extends ParamListBase>(props: {
  route: RouteProp<ParamList>;
  navigation: any;
}) => StackNavigationOptions = ({navigation}) => ({
  headerShown: false,
  headerShadowVisible: false,
  headerTintColor: '#1B182C',
  headerStyle: {
    backgroundColor: colorScheme === 'dark' ? '#181A20' : '#ffffff',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerBackTitle: '',
  headerLeft: () => <BackButton navigation={navigation} />,
  // headerBackgroundContainerStyle: {
  //   borderBottomWidth: 1,
  //   borderColor: '#CCC7EA',
  // },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : '500',
  },
  headerTitleAllowFontScaling: true,
  cardStyle: {
    backgroundColor: colorScheme === 'dark' ? '#181A20' : '#ffffff',
  },
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
});
