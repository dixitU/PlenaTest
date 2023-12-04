import {types, Instance} from 'mobx-state-tree';
import React, {createContext} from 'react';
import {Animated, ToastAndroid} from 'react-native';

const Cart = types
  .model({
    id: types.optional(types.number, 0),
    quantity: types.optional(types.number, 0),
  })
  .actions((self: any) => ({
    increaseQuantity() {
      self.quantity = self.quantity + 1;
    },
    decreaseQuantity() {
      self.quantity = self.quantity - 1;
    },
  }));

export const rootStore = types
  .model({
    favourite: types.array(types.number),
    cart: types.array(Cart),
  })
  .actions((self: any) => ({
    addToFavourite(id: any) {
      console.log('addToFavourite');
      const isExist = self.favourite.find((e: any) => e === id);
      if (isExist) {
        const filtered = self.favourite.filter((e: any) => e !== id);
        self.favourite = filtered;
      } else {
        self.favourite.push(id);
      }
    },
    addToCart(id: any) {
      const isExist = self.cart.find((e: any) => e.id === id);
      if (isExist) {
        // isExist.increaseQuantity();
        ToastAndroid.show('Already in cart', ToastAndroid.SHORT);
      } else {
        self.cart.push({
          id: id,
          quantity: 1,
        });
        ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
      }
    },
    removeFromCart(id: any) {
      const isExist = self.cart.find((e: any) => e.id === id);
      if (isExist && isExist.quantity > 1) {
        isExist.decreaseQuantity();
      } else {
        const filtered = self.cart.filter((e: any) => e.id !== id);
        self.cart = filtered;
      }
    },
  }))
  .create({
    favourite: [],
    cart: [],
  });

const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);

export function useStore() {
  const store = React.useContext(RootStoreContext);
  // if (store === (null || undefined)) {
  //   console.log('it is working');
  //   throw new Error('Store cannot be null, please add a context provider');
  // }
  return store;
}

export const StoreProvider = RootStoreContext.Provider;
