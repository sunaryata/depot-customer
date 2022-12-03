import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import App from './router.js';
import {SplashScreen} from '../screens/SplashScreen';
import {Provider} from 'react-redux';
import {store} from '../redux';

export default function Router() {
  const [splash, setSplash] = React.useState(true);

  setTimeout(() => {
    setSplash(false);
  }, 2000);

  return (
    <Provider store={store}>{splash ? <SplashScreen /> : <App />}</Provider>
  );
}
