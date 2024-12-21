import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../../context/ThemeContext";
import { Themes } from "../../../styling/Themes";
import SettingsScreen from "../../../screens/SettingsScreen";
import ArtistDetailScreen from "../../../screens/DetailScreens/ArtistDetailScreen";
import TrackDetailScreen from "../../../screens/DetailScreens/TrackDetailScreen";
import AlbumDetailScreen from "../../../screens/DetailScreens/AlbumDetailScreen";
import AddAlbumScreen from "../../../screens/AddScreens/AddAlbumScreen";
import AddTrackScreen from "../../../screens/AddScreens/AddTrackScreen";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const SettingStackNavigator = () => {
	const { theme } = useTheme();
	const currentTheme = Themes[theme];
	const { t } = useTranslation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: currentTheme.background,
				},
				headerTintColor: currentTheme.primaryText,
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerBackTitleStyle: {
					color: currentTheme.primaryText,
				},
				headerBackImage: () => (
					<Ionicons name="arrow-back" size={24} color={currentTheme.accent} />
				),
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: t("settingsTitle") }}
			/>

			<Stack.Screen
				name="TrackDetailScreen"
				component={TrackDetailScreen}
				options={({ route }) => ({ title: route.params.title })}
			/>
			<Stack.Screen
				name="ArtistDetailScreen"
				component={ArtistDetailScreen}
				options={({ route }) => ({ title: route.params.name })}
			/>
			<Stack.Screen
				name="AlbumDetailScreen"
				component={AlbumDetailScreen}
				options={({ route }) => ({ title: route.params.album.title })}
			/>
			<Stack.Screen
				name="AddTrackScreen"
				component={AddTrackScreen}
				options={{ title: t("addTrackTitle") }}
			/>
			<Stack.Screen
				name="AddAlbumScreen"
				component={AddAlbumScreen}
				options={{ title: t("addAlbumTitle") }}
			/>
		</Stack.Navigator>
	);
};

export default SettingStackNavigator;
