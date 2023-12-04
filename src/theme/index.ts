import constate from 'constate';
import {useState} from 'react';
import {useColorScheme, StyleProp, TextStyle} from 'react-native';

// others

type StatusBarStyle = 'default' | 'light-content' | 'dark-content';

type styleProps = {
  buttonText: string | undefined;
  background: string;
  statusBarStyle: null | StatusBarStyle | undefined;
};

type TypographyType =
  | 'heading1Bold'
  | 'heading1SemiBold'
  | 'heading1Medium'
  | 'heading1Regular'
  | 'heading2Bold'
  | 'heading2SemiBold'
  | 'heading2Regular'
  | 'heading2Medium'
  | 'heading3Bold'
  | 'heading3SemiBold'
  | 'heading3Medium'
  | 'heading3Regular'
  | 'heading4Bold'
  | 'heading4SemiBold'
  | 'heading4Medium'
  | 'heading4Regular'
  | 'body1SemiBold'
  | 'body1Medium'
  | 'body1Regular'
  | 'body2SemiBold'
  | 'body2Medium'
  | 'body2Regular'
  | 'LabelMedium'
  | 'LabelRegular'
  | 'ButtonMedium'
  | 'ButtonRegular';

export function useTheme() {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(colorScheme);

  const black = {
    100: '#1B262E',
    200: '#354349',
    300: '#606D76',
    400: '#A9B4BC',
    500: '#C5CDD2',
    600: '#E7ECF0',
    700: '#F8F9FB',
  };

  const palatte = {
    primary: '#2A4BA0',
    secondery: '#153075',
    tertiary: '#F9B023',
    forthy: '#FFC83A',
  };

  const text = {
    200: '#1A1D1F',
  };

  const style: styleProps = {
    background: '#ffffff',
    statusBarStyle: themeMode === 'dark' ? 'light-content' : 'dark-content',
  };

  const theme = {
    colors: {
      black,
      palatte,
      text,
      grey: themeMode === 'dark' ? '#1F222A' : '#F5F5F5',
      cardOverlay: themeMode === 'dark' ? '#1F222A' : '#fff',
      primary: '#246BFD',
    },
  };

  const typography: Record<TypographyType, StyleProp<TextStyle>> = {
    heading1Bold: {
      fontFamily: 'Manrope-Bold',
      fontSize: 30,
      lineHeight: 38,
      color: theme.colors.text[200],
      fontWeight: '700',
    },
    heading1SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 30,
      lineHeight: 38,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    heading1Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 30,
      lineHeight: 38,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    heading1Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 30,
      lineHeight: 38,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    heading2Bold: {
      fontFamily: 'Manrope-Bold',
      fontSize: 26,
      lineHeight: 32,
      color: theme.colors.text[200],
      fontWeight: '700',
    },
    heading2SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 26,
      lineHeight: 32,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    heading2Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 26,
      lineHeight: 32,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    heading2Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 26,
      lineHeight: 32,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    heading3Bold: {
      fontFamily: 'Manrope-Bold',
      fontSize: 20,
      lineHeight: 26,
      color: theme.colors.text[200],
      fontWeight: '700',
    },
    heading3SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 20,
      lineHeight: 26,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    heading3Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 20,
      lineHeight: 26,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    heading3Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 20,
      lineHeight: 26,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    heading4Bold: {
      fontFamily: 'Manrope-Bold',
      fontSize: 18,
      lineHeight: 22,
      color: theme.colors.text[200],
      fontWeight: '700',
    },
    heading4SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 18,
      lineHeight: 22,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    heading4Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 18,
      lineHeight: 22,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    heading4Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 18,
      lineHeight: 22,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    body1SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    body1Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    body1Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    body2SemiBold: {
      fontFamily: 'Manrope-SemiBold',
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    body2Medium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    body2Regular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    LabelMedium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
    LabelRegular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.text[200],
      fontWeight: '400',
    },
    ButtonMedium: {
      fontFamily: 'Manrope-Medium',
      fontSize: 14,
      lineHeight: 19.12,
      color: theme.colors.text[200],
      fontWeight: '600',
    },
    ButtonRegular: {
      fontFamily: 'Manrope-Regular',
      fontSize: 14,
      lineHeight: 19.12,
      color: theme.colors.text[200],
      fontWeight: '500',
    },
  };

  return {themeMode, style, typography, theme};
}

export const [ThemeProvider, useThemeContext] = constate(useTheme);
