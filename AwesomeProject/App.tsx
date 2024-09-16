import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import LoginPage from './src/navigate/Login/LoginScreen';
import TabBottom from './src/navigate/HomePage/TabBottom';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="HomeTabs" component={TabBottom} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
