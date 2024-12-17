import React from "react";
import ArtistsStackNavigator from "./stacks/ArtistsStackNavigator";
import SettingsScreen from "../../screens/SettingsScreen";
import SearchStackNavigator from "./stacks/SearchStackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../context/ThemeContext";
import SettingsStackNavigator from "./stacks/SettingStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const { isDarkMode } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Artists") {
						iconName = focused ? "musical-notes" : "musical-notes-outline";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (route.name === "Search") {
						iconName = focused ? "search" : "search-outline";
					}

					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: {
					backgroundColor: isDarkMode ? "black" : "white",
				},
				headerStyle: {
					backgroundColor: isDarkMode ? "black" : "white",
				},
				headerTintColor: isDarkMode ? "white" : "black",
				tabBarAccessibilityLabel: route.name,
			})}
		>
			<Tab.Screen
				name="Artists"
				component={ArtistsStackNavigator}
				options={{ headerShown: false, tabBarAccessibilityLabel: "Artists" }}
			/>
			<Tab.Screen
				name="Search"
				component={SearchStackNavigator}
				options={{ headerShown: false, tabBarAccessibilityLabel: "Search" }}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsStackNavigator}
				options={{ headerShown: false, tabBarAccessibilityLabel: "Settings" }}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabs;
