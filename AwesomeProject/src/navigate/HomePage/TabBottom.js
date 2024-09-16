// src/pages/TabBottom.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomePage/Product';
import SettingsScreen from '../HomePage/Cart';
const Tab = createBottomTabNavigator();

const TabBottom = ({route}) => {
  const {username} = route.params || {};
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Products">
        {props => <HomeScreen {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="Cart" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabBottom;
