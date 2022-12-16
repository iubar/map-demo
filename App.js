import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Map1Screen from './src/screens/Map1Screen';
import Map2Screen from './src/screens/Map2Screen';
import Map3Screen from './src/screens/Map3Screen';
import {
	NavigationContainer,
	DarkTheme as DarkThemeNav,
	DefaultTheme as DefaultThemeNav,
} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen
						name="Map 1"
						component={Map1Screen}
						options={{
							tabBarLabel: 'Markers',
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="home" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Map 2"
						component={Map2Screen}
						options={{
							tabBarLabel: 'Events',
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="bell" color={color} size={size} />
							),
							tabBarBadge: 3,
						}}
					/>
					<Tab.Screen
						name="Map 3"
						component={Map3Screen}
						options={{
							tabBarLabel: 'Clusters',
							tabBarIcon: ({ color, size }) => (
								<MaterialCommunityIcons name="account" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}
