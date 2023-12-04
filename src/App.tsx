/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Appearance} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NativeBaseProvider} from 'native-base';

// import * as amplitude from '@amplitude/analytics-react-native';

// hooks
import {ThemeProvider} from './theme';
import {NetInfoProvider} from './hooks/use-net-info';
import {ProductInfoProvider} from './hooks/use-product-info';

// screens
import AppContent from './AppContent';
import {StoreProvider, rootStore} from './models';

// others
// import {linking} from './utils/deeplinks';

const queryClient = new QueryClient();

FontAwesome.loadFont();

const colorScheme = Appearance.getColorScheme();

class App extends React.Component {
  routeNameRef: React.RefObject<any>;
  navigationRef: React.RefObject<any>;
  config: {screens: {Home: {path: string}}};
  linking: {
    prefixes: string[];
    config: {
      screens: {
        Home: {path: string};
      };
    };
  };
  constructor(props: any) {
    super(props);
    this.routeNameRef = React.createRef();
    this.navigationRef = React.createRef();
    this.config = {
      screens: {
        Home: {
          path: 'home',
        },
      },
    };
    this.linking = {
      prefixes: ['plenatest://'],
      config: this.config,
    };
  }

  render() {
    return (
      <StoreProvider value={rootStore}>
        <NativeBaseProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <NavigationContainer
                ref={this.navigationRef}
                linking={this.linking}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <NetInfoProvider>
                  <ProductInfoProvider>
                    <AppContent />
                  </ProductInfoProvider>
                </NetInfoProvider>
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </StoreProvider>
    );
  }
}

export default App;
