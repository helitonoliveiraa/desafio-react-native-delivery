import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import Routes from './routes';

import { AppThemeProvider } from './context/index';

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Routes />
      </View>
    </AppThemeProvider>
  );
};

export default App;
