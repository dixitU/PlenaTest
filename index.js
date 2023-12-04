/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {persist} from 'mst-persist';
import {rootStore} from './src/models';
import * as SecureStorage from './src/components/sensitive-info/sensitive-info';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';

persist('root', rootStore, {
  storage: SecureStorage, // default: localStorage
  jsonify: true, // if you use AsyncStorage, this should be true
  // default: true,
  whitelist: ['favourite', 'cart'], // only these keys will be persisted
}).then(() => {
  console.log('someStore has been hydrated', rootStore);
});

startNetworkLogging();

AppRegistry.registerComponent(appName, () => App);
