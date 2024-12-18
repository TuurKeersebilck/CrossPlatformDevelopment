import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../context/ThemeContext";
import SettingsScreen from "../../../screens/SettingsScreen";
import ArtistDetailScreen from "../../../screens/ArtistDetailScreen";
import ArtistsScreen from "../../../screens/ArtistsScreen";
import TrackDetailScreen from "../../../screens/TrackDetailScreen";
import AlbumDetailScreen from "../../../screens/AlbumDetailScreen";

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
				name="ArtistDetail"
				component={ArtistDetailScreen}
				options={({ route }) => ({ title: route.params.name })}
			/>
			<Stack.Screen
				name="ArtistsScreen"
				component={ArtistsScreen}
				options={{ title: "Artists" }}
			/>
			<Stack.Screen
				name="TrackDetail"
				component={TrackDetailScreen}
				options={({ route }) => ({ title: route.params.title })}
			/>
			<Stack.Screen
				name="AlbumDetail"
				component={AlbumDetailScreen}
				options={({ route }) => ({ title: route.params.album.title })}
			/>
		</Stack.Navigator>
	);
};

export default SettingStackNavigator;
