import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  ImageComponent,
  TextStyle,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// hooks
import {useTheme} from '../theme';

// others
// import {translate} from '../utils/translate';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {wp, hp, scale} from '../utils/scale';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

type ButtonProps = {
  type: string;
  label?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  isLoading?: boolean;
  disable?: boolean;
  tintColor?: string;
  loadingColor?: string;
  image?: any;
};

function Button({
  type,
  onPress,
  label,
  buttonStyle,
  labelStyle,
  isLoading = false,
  tintColor,
  disable = false,
  loadingColor,
  image,
}: ButtonProps) {
  const {style, typography, theme, themeMode} = useTheme();

  function onPressEffect() {
    ReactNativeHapticFeedback.trigger('impactLight', options);
    onPress();
  }

  if (type === 'primary') {
    return (
      <TouchableOpacity
        style={[
          styles.primaryContainer,
          buttonStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: theme.colors.palatte.primary,
          },
        ]}
        disabled={disable}
        onPress={onPressEffect}>
        {image}
        <Text
          style={[typography.ButtonMedium, labelStyle, styles.primaryLabel]}>
          {label}
        </Text>
        {isLoading ? (
          <ActivityIndicator
            color={loadingColor || style.buttonText}
            size="small"
            style={styles.loading}
          />
        ) : null}
      </TouchableOpacity>
    );
  }

  if (type === 'secondary') {
    return (
      <TouchableOpacity
        style={[
          styles.primaryContainer,
          {borderWidth: 1, borderColor: theme.colors.palatte.primary},
          buttonStyle,
        ]}
        disabled={disable}
        onPress={onPressEffect}>
        {image}
        <Text
          style={[
            typography.ButtonMedium,
            styles.primaryLabel,
            {
              color: theme.colors.palatte.primary,
            },
            labelStyle,
          ]}>
          {label}
        </Text>
        {isLoading ? (
          <ActivityIndicator
            color={loadingColor || style.buttonText}
            size="small"
            style={styles.loading}
          />
        ) : null}
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  circleContainer: {
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    elevation: 5,
    shadowOffset: {width: 1, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  circleImage: {
    height: 20,
    width: 20,
  },
  primaryLabel: {
    textAlign: 'center',
    color: '#FFF',
  },
  primaryContainer: {
    // width: wp('100%') - 32,
    flexGrow: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  loading: {
    marginLeft: 10,
  },
});

export default Button;
