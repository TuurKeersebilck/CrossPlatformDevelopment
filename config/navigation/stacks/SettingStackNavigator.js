import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../context/ThemeContext";
import SettingsScreen from "../../../screens/SettingsScreen";
import AllFavoritesScreen from "../../../screens/AllFavoritesScreen"; 

const Stack = createStackNavigator();

const SettingStackNavigator = () => {
	const { isDarkMode } = useTheme();

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: isDarkMode ? "black" : "white",
				},
				headerTintColor: isDarkMode ? "white" : "black",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerBackTitleStyle: {
					color: isDarkMode ? "tomato" : "blue",
				},
				headerBackImage: () => (
					<Ionicons
						name="arrow-back"
						size={24}
						color={isDarkMode ? "tomato" : "blue"}
					/>
				),
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: "Settings" }}
			/>

			<Stack.Screen
				name="AllFavoritesScreen"
				component={AllFavoritesScreen}
				options={{ title: "All Favorites" }}
			/>
		</Stack.Navigator>
	);
};

export default SettingStackNavigator;
