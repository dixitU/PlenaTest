import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// hooks
import {useTheme} from '../../theme';

// others
import {AppNavigatorProps} from '../../types/navigator';
import {wp} from '../../utils/scale';
import {useProductInfoContext} from '../../hooks/use-product-info';
import {rootStore} from '../../models';

// components

const Home = observer(props => {
  const navigation = useNavigation<AppNavigatorProps>();
  const {style, typography, theme} = useTheme();
  const {products} = useProductInfoContext();
  const {focused} = useIsFocused();

  // states
  const [key, setKey] = useState('flatListKey');
  const [input, setInput] = useState('');

  useEffect(() => {
    setKey(Math.random().toString());
  }, [focused]);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={[
          styles.productContainer,
          {
            marginLeft: (index + 1) % 2 == 0 ? 15 : 0,
            marginTop: index > 1 ? 15 : 0,
          },
        ]}
        key={item.id}
        onPress={() => navigation.navigate('Product', {id: item.id})}>
        <TouchableOpacity
          style={styles.heartContainer}
          onPress={() => {
            // console.log('onPressed heart');
            rootStore.addToFavourite(item.id);
            setKey(Math.random().toString());
          }}>
          {rootStore.favourite.includes(item.id) ? (
            <Image
              source={require('../../images/filled-heart.png')}
              style={styles.heartImage}
            />
          ) : (
            <Image
              source={require('../../images/empty-heart.png')}
              style={styles.heartImage}
            />
          )}
        </TouchableOpacity>
        <Image
          source={{
            uri: item.thumbnail,
          }}
          style={styles.productImage}
        />
        <View style={styles.detailContainer}>
          <View>
            <Text style={[typography.body2SemiBold, {maxWidth: '90%'}]}>
              ${item.price}
            </Text>
            <Text style={[typography.LabelRegular, {maxWidth: '90%'}]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.plusContainer,
              {backgroundColor: theme.colors.palatte.primary},
            ]}
            onPress={() => rootStore.addToCart(item.id)}>
            <Image
              source={require('../../images/plus.png')}
              style={styles.plusImage}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: style.background}]}>
      <StatusBar
        backgroundColor={theme.colors.palatte.primary}
        barStyle={style.statusBarStyle}
      />
      <View
        style={[
          styles.topContainer,
          {backgroundColor: theme.colors.palatte.primary},
        ]}>
        <View style={styles.headerContainer}>
          <Text
            style={[styles.titleText, {color: '#F8F9FB'}]}
            onPress={() => navigation.navigate('NetworkLogger')}>
            Hey, Rahul
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            {rootStore.cart.length > 0 ? (
              <View
                style={[
                  styles.countContainer,
                  {
                    backgroundColor: theme.colors.palatte.tertiary,
                    borderColor: theme.colors.palatte.primary,
                  },
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
        <View
          style={[
            styles.searchContainer,
            {backgroundColor: theme.colors.palatte.secondery},
          ]}>
          <Image
            source={require('../../images/search.png')}
            style={styles.searchImage}
          />
          {/* <Text style={[typography.ButtonMedium, {color: '#8891A5'}]}>
            Search Products or store
          </Text> */}
          <TextInput
            placeholder="Search Products or store"
            placeholderTextColor={'#8891A5'}
            onChangeText={(text: any) => setInput(text)}
          />
        </View>
      </View>
      <FlatList
        key={key}
        data={products?.products?.filter(
          (e: any) => e.title.toLowerCase().search(input.toLowerCase()) > -1,
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id || rootStore.favourite}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingBottom: 100,
          flexDirection: 'column',
          width: wp('100%') - 40,
        }}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={typography.heading1Bold}>No Products Found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollContainer: {
    width: wp('100%') - 40,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  topContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 60,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 22,
    lineHeight: 30.5,
    fontWeight: '500',
  },
  cartImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  searchImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  productContainer: {
    width: wp('50%') - 27,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  productImage: {
    width: wp('50%') - 50,
    height: wp('50%') - 50,
    resizeMode: 'contain',
  },
  plusImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  heartImage: {
    width: 14.55,
    height: 13.35,
    resizeMode: 'contain',
  },
  plusContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    zIndex: 999,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  heartContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 999,
  },
  emptyContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 7,
    borderRadius: 20,
    zIndex: 999,
    borderWidth: 2,
    right: -10,
    top: -5,
  },
});

export default Home;
