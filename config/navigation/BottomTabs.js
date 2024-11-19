import React from "react";
import TracksStackNavigator from "./stacks/TracksStackNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import SearchStackNavigator from "./stacks/SearchStackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const { isDarkMode } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "TracksTab") {
						iconName = focused ? "musical-notes" : "musical-notes-outline";
					} else if (route.name === "SettingsTab") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (route.name === "SearchTab") {
						iconName = focused ? "search" : "search-outline";
					}

					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: isDarkMode ? "white" : "tomato",
				tabBarInactiveTintColor: isDarkMode ? "gray" : "gray",
				tabBarStyle: {
					backgroundColor: isDarkMode ? "black" : "white",
				},
			})}
		>
			<Tab.Screen
				name="TracksTab"
				component={TracksStackNavigator}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="SearchTab"
				component={SearchStackNavigator}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="SettingsTab" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabs;
