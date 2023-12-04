import React, {useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import LottieView from 'lottie-react-native';

// hooks
import {useTheme} from '../../theme';

// others
import {wp} from '../../utils/scale';

// components

const NoInternet = observer((props: any) => {
  const {style, typography} = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: style.background}]}>
      <StatusBar
        backgroundColor={style.background}
        barStyle={style.statusBarStyle}
      />
      <View style={styles.viewContainer}>
        <View style={styles.successContainer}>
          <LottieView
            source={require('../../animations/internet-check.json')}
            resizeMode="cover"
            autoPlay={true}
            loop={true}
            style={styles.lottie}
          />
          <Text style={[typography.heading2, {textAlign: 'center'}]}>
            No Internet Available
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flexGrow: 1,
    width: wp('100%') - 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
    // transform: [{scale: 1.8}],
    marginBottom: 10,
  },
});

export default NoInternet;
