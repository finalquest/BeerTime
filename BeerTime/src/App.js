import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './containers/AppNavigator';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
      <AppNavigator />
    </SafeAreaView>
  </Provider>
);

export default App;
