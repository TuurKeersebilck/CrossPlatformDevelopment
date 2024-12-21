import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { useTranslation } from "react-i18next";
import ArtistsStackNavigator from "./stacks/ArtistsStackNavigator";
import SearchStackNavigator from "./stacks/SearchStackNavigator";
import SettingsStackNavigator from "./stacks/SettingStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const currentTheme = Themes[theme];

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
					backgroundColor: currentTheme.background,
				},
				headerStyle: {
					backgroundColor: currentTheme.background,
				},
				headerTintColor: currentTheme.primaryText,
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
