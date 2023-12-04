import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '../../theme';

type BackButtonType = {
  navigation: any;
};

function BackButton({navigation}: BackButtonType) {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        navigation.goBack();
      }}>
      <Image
        source={require('../../images/arrow.png')}
        style={[styles.backArrow, {tintColor: '#fff'}]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 8,
    paddingLeft: 16,
    marginRight: 5,
  },
  backArrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default BackButton;
