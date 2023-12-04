import React, {useEffect} from 'react';
import AppNavigator from './navigators/app-navigator';
import {useNetInfoContext} from './hooks/use-net-info';
import NoInternet from './screens/no-internet';

/**
 * Actual component rendering the app. At is uses the context inside it,
 * so we have to create another App component to wrap it with the context providers
 * used inside it.
 *
 * @see App
 */

export default function AppContent() {
  const {isOffline, loadNetInfo} = useNetInfoContext();

  useEffect(() => {
    loadNetInfo();
  }, []);

  if (isOffline) {
    return <NoInternet />;
  } else {
    return <AppNavigator />;
  }
}
