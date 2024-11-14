import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/settingsScreen";
import SearchScreen from "./screens/searchScreen";

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Tracks") {
							iconName = focused ? "musical-notes" : "musical-notes-outline";
						} 
						else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}
						else if (route.name === "Search") {
							iconName = focused ? "search" : "search-outline";
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name="Tracks" component={HomeScreen} />
				<Tab.Screen name="Search" component={SearchScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default App;
