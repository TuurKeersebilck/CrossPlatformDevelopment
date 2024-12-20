import React from "react";
import ArtistsStackNavigator from "./stacks/ArtistsStackNavigator";
import SettingsStackNavigator from "./stacks/SettingStackNavigator";
import SearchStackNavigator from "./stacks/SearchStackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const { isDarkMode } = useTheme();
	const { t } = useTranslation();

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
			})}
		>
			<Tab.Screen
				name="Artists"
				component={ArtistsStackNavigator}
				options={{
					headerShown: false,
					tabBarLabel: t("artistsTab"),
					tabBarAccessibilityLabel: t("artistsTab"),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchStackNavigator}
				options={{
					headerShown: false,
					tabBarLabel: t("searchTab"),
					tabBarAccessibilityLabel: t("searchTab"),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsStackNavigator}
				options={{
					headerShown: false,
					tabBarLabel: t("settingsTab"),
					tabBarAccessibilityLabel: t("settingsTab"),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabs;
