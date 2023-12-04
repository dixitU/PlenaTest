import constate from 'constate';
import {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetInfo() {
  const [isOffline, setOfflineStatus] = useState(false);
  async function loadNetInfo() {
    NetInfo.addEventListener(
      (state: {isConnected: any; isInternetReachable: any}) => {
        console.log('state.isConnected', state.isConnected);
        if (state.isConnected !== null) {
          setOfflineStatus(!state.isConnected);
        }
      },
    );
  }

  return {isOffline, loadNetInfo};
}

export const [NetInfoProvider, useNetInfoContext] = constate(useNetInfo);
