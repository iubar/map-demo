import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MapExample from './src/MapExample';
 

const AppNavigator = createStackNavigator({
  Home: {
	screen: MapExample
  }
});

export default createAppContainer(AppNavigator);