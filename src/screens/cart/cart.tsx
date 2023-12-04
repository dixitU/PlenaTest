import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {observer} from 'mobx-react-lite';

// hooks
import {useTheme} from '../../theme';

// others
import {AppNavigatorProps} from '../../types/navigator';
import {wp} from '../../utils/scale';
import {rootStore} from '../../models';
import {useProductInfoContext} from '../../hooks/use-product-info';
import Button from '../../components/Button';

// components

const Cart = observer(props => {
  const navigation = useNavigation<AppNavigatorProps>();
  const {style, typography, theme} = useTheme();
  const {products} = useProductInfoContext();
  const animationRef: any = useRef(new Animated.Value(0)).current;

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // states
  const [key, setKey] = useState('flatListKey');
  let subTotal = useRef(0);
  // const [subTotal, setSubTotal] = useState(0);
  const [newCart, setNewCart] = useState([]);

  // useEffect(() => {
  //   setSubTotal(0);
  // }, [key]);

  useEffect(() => {
    updateProducts();
  }, [key]);

  const updateProducts = async () => {
    const updatedCart: any = await rootStore.cart?.map((e: any) => {
      return {...e, ...{animationRef: new Animated.Value(0)}};
    });
    setNewCart(updatedCart);
    // setKey(Math.random().toString());
    // forceUpdate();
    // console.log('newProducts', newProducts);
  };

  const removeFromCart = async (id: any, index: any) => {
    await Animated.parallel([
      Animated.timing(newCart[index]?.animationRef, {
        toValue: wp('100%'),
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(async o => {
      if (o.finished) {
        rootStore.removeFromCart(id);
        // forceUpdate();
        setKey(Math.random().toString());
        forceUpdate();
      }
    });
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const product: any = products?.products?.find((e: any) => e.id === item.id);
    return product ? (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            marginTop: index !== 0 ? 15 : 0,
            transform: [{translateX: newCart[index]?.animationRef}],
          },
        ]}
        onLayout={() => {
          // setSubTotal(subTotal + product.price * item.quantity);
          subTotal.current = subTotal.current + product.price * item.quantity;
          forceUpdate();
        }}>
        <View style={[styles.rowContainer, {maxWidth: '60%'}]}>
          <Image
            source={{uri: product.thumbnail}}
            style={styles.productImage}
          />
          <View style={{width: '90%'}}>
            <Text style={[typography.ButtonRegular, {width: '80%'}]}>
              {product.title}
            </Text>
            <Text style={typography.body2Regular}>${product.price}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[styles.circleContainer, {marginRight: 10}]}
            onPress={() => {
              if (item.quantity > 1) {
                // setSubTotal(0);
                subTotal.current = 0;
                rootStore.cart[index].decreaseQuantity();
                forceUpdate();
                setKey(Math.random().toString());
              } else {
                // setSubTotal(0);
                subTotal.current = 0;
                removeFromCart(item.id, index);
              }
            }}>
            <Text style={typography.heading2Regular}>-</Text>
          </TouchableOpacity>
          <Text style={typography.ButtonMedium}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.circleContainer, {marginLeft: 10}]}
            onPress={() => {
              // setSubTotal(0);
              subTotal.current = 0;
              // item.increaseQuantity();
              rootStore.cart[index].increaseQuantity();
              setKey(Math.random().toString());
              forceUpdate();
            }}>
            <Text style={typography.heading3Medium}>+</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ) : null;
  };

  const invoiceContent = useMemo(() => {
    console.log('subTotal', subTotal.current);
    return subTotal.current !== 0 && rootStore.cart.length > 0 ? (
      <View style={styles.invoiceContainer}>
        <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
          <Text style={typography.body2Regular}>Subtotal</Text>
          <Text style={typography.body2Medium}>${subTotal.current}</Text>
        </View>
        <View
          style={[
            styles.rowContainer,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text style={typography.body2Regular}>Delivery</Text>
          <Text style={typography.body2Medium}>$2</Text>
        </View>
        <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
          <Text style={typography.body2Regular}>Total</Text>
          <Text style={typography.body2SemiBold}>${subTotal.current + 2}</Text>
        </View>
        <Button
          type="primary"
          label={'Proceed  To checkout'}
          onPress={() => {
            // navigation.navigate('Permissions');
          }}
          buttonStyle={{marginTop: 30}}
        />
      </View>
    ) : null;
  }, [
    subTotal.current,
    rootStore.cart.length,
    typography.body2Medium,
    typography.body2Regular,
    typography.body2SemiBold,
  ]);

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
        <Text style={typography.body1Regular}>
          Shopping Cart ({rootStore.cart.length})
        </Text>
      </View>
      <FlatList
        key={key}
        data={newCart}
        renderItem={renderItem}
        keyExtractor={item => item.id || newCart}
        contentContainerStyle={{
          paddingBottom: 100,
          width: wp('100%') - 40,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={typography.heading1Bold}>Empty cart</Text>
          </View>
        }
      />
      {invoiceContent}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: wp('100%') - 40,
    marginVertical: 20,
  },
  backContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F8F9FB',
    marginRight: 20,
  },
  backImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  productImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%') - 40,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBFB',
    paddingBottom: 15,
  },
  emptyContainer: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  invoiceContainer: {
    width: wp('100%') - 40,
    backgroundColor: '#F8F9FB',
    padding: 15,
    borderRadius: 30,
  },
});

export default Cart;
