import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import Carousel from '../../library/react-native-anchor-carousel';

// hooks
import {useTheme} from '../../theme';

// others
import {
  AppNavigatorProps,
  AppNavigatorScreenRoute,
} from '../../types/navigator';
import {wp} from '../../utils/scale';
import {useRoute} from '@react-navigation/native';
import {useProductInfoContext} from '../../hooks/use-product-info';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {rootStore} from '../../models';

// components

const Product = observer(props => {
  const navigation = useNavigation<AppNavigatorProps>();
  const route = useRoute<AppNavigatorScreenRoute<'Product'>>();
  const {products} = useProductInfoContext();
  const {style, typography, theme} = useTheme();

  const product = products?.products?.find(
    (e: any) => e.id === route.params.id,
  );

  const toggleHeart = () => {
    rootStore.addToFavourite(route.params.id);
  };

  const _renderItem = ({item, index}: any) => {
    return (
      <Image source={{uri: item}} style={styles.bannerImage} key={index} />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: style.background}]}>
      <StatusBar backgroundColor={'#fff'} barStyle={style.statusBarStyle} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../images/arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          {rootStore.cart.length > 0 ? (
            <View
              style={[
                styles.countContainer,
                {backgroundColor: theme.colors.palatte.tertiary},
              ]}>
              <Text
                style={[
                  typography.ButtonMedium,
                  {color: '#fff', width: '100%'},
                ]}>
                {rootStore.cart.length > 9 ? '9+' : rootStore.cart.length}
              </Text>
            </View>
          ) : null}
          <Image
            source={require('../../images/bag.png')}
            style={styles.cartImage}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}>
        <Text style={[styles.titleText, {color: theme.colors.text[200]}]}>
          {product.title}
        </Text>
        <View style={styles.starContainer}>
          <Image
            source={
              Math.round(product.rating * 2) / 2 === 0.5
                ? require('../../images/half-star.png')
                : require('../../images/filled-star.png')
            }
            style={[
              styles.starImage,
              {
                tintColor:
                  Math.round(product.rating * 2) / 2 >= 0.5
                    ? undefined
                    : '#1B262E',
              },
            ]}
          />
          <Image
            source={
              Math.round(product.rating * 2) / 2 === 1.5
                ? require('../../images/half-star.png')
                : require('../../images/filled-star.png')
            }
            style={[
              styles.starImage,
              {
                tintColor:
                  Math.round(product.rating * 2) / 2 >= 1.5
                    ? undefined
                    : '#1B262E',
              },
            ]}
          />
          <Image
            source={
              Math.round(product.rating * 2) / 2 === 2.5
                ? require('../../images/half-star.png')
                : require('../../images/filled-star.png')
            }
            style={[
              styles.starImage,
              {
                tintColor:
                  Math.round(product.rating * 2) / 2 >= 2.5
                    ? undefined
                    : '#1B262E',
              },
            ]}
          />
          <Image
            source={
              Math.round(product.rating * 2) / 2 === 3.5
                ? require('../../images/half-star.png')
                : require('../../images/filled-star.png')
            }
            style={[
              styles.starImage,
              {
                tintColor:
                  Math.round(product.rating * 2) / 2 >= 3.5
                    ? undefined
                    : '#1B262E',
              },
            ]}
          />
          <Image
            source={
              Math.round(product.rating * 2) / 2 === 4.5
                ? require('../../images/half-star.png')
                : require('../../images/filled-star.png')
            }
            style={[
              styles.starImage,
              {
                tintColor:
                  Math.round(product.rating * 2) / 2 >= 4.5
                    ? undefined
                    : '#1B262E',
              },
            ]}
          />
        </View>
        <Carousel
          data={product.images}
          renderItem={_renderItem}
          sliderWidth={'100%'}
          itemWidth={wp('100%')}
          style={{height: 0, marginTop: 10}}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 500,
          }}
          favourite={rootStore.favourite.includes(route.params.id)}
          toggleHeart={toggleHeart}
        />
        <View style={styles.priceContainer}>
          <Text
            style={[styles.priceText, {color: theme.colors.palatte.primary}]}>
            ${product.price}
          </Text>
          <View
            style={[
              styles.discountContainer,
              {backgroundColor: theme.colors.palatte.primary},
            ]}>
            <Text style={[styles.discountText, {color: '#fff'}]}>
              ${((product.price * product.discountPercentage) / 100).toFixed(2)}{' '}
              OFF
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            type="secondary"
            label={'Add To Cart'}
            onPress={() => {
              // navigation.navigate('Permissions');
              rootStore.addToCart(route.params.id);
            }}
            buttonStyle={{marginRight: 10, width: (wp('50%') - 40) / 2}}
          />
          <Button
            type="primary"
            label={'Buy Now'}
            onPress={() => {
              // navigation.navigate('Permissions');
              rootStore.addToCart(route.params.id);
              navigation.navigate('Cart');
            }}
            buttonStyle={{width: (wp('50%') - 40) / 2}}
          />
        </View>
        <Text style={[typography.body1Regular, {width: wp('100%') - 40}]}>
          Details
        </Text>
        <Text
          style={[
            typography.body1Regular,
            {width: wp('100%') - 40, color: '#8891A5'},
          ]}>
          {product.description}
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  backContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F8F9FB',
  },
  backImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  cartImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#1E222B',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%') - 40,
    marginVertical: 20,
  },
  titleText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 50,
    lineHeight: 62.55,
    fontWeight: '800',
    width: wp('100%') - 40,
  },
  priceText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  discountText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  discountContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  starImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%') - 40,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: wp('100%') - 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%') - 40,
    marginVertical: 20,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 7,
    borderRadius: 20,
    zIndex: 999,
    borderWidth: 2,
    borderColor: '#fff',
    right: -10,
    top: -5,
  },
});

export default Product;
