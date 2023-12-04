import constate from 'constate';
import {useEffect} from 'react';
import {persist} from 'mst-persist';
import {rootStore} from '../models';
import * as SecureStorage from '../components/sensitive-info/sensitive-info';
import {useQuery} from 'react-query';
import {getAllProducts} from '../apis/product';

export function useProductInfo() {
  const {data: products} = useQuery('products', getAllProducts);

  useEffect(() => {
    persist('root', rootStore, {
      storage: SecureStorage, // default: localStorage
      jsonify: true, // if you use AsyncStorage, this should be true
      // default: true,
      whitelist: ['favourite', 'cart'], // only these keys will be persisted
    }).then(() => {
      console.log('someStore has been hydrated', rootStore);
    });
  }, []);

  return {products};
}

export const [ProductInfoProvider, useProductInfoContext] =
  constate(useProductInfo);
