import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistsScreen from "../../../screens/ArtistsScreen";
import AddArtistScreen from "../../../screens/AddScreens/AddArtistScreen";
import TrackDetailScreen from "../../../screens/DetailScreens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/DetailScreens/ArtistDetailScreen";
import AlbumDetailScreen from "../../../screens/DetailScreens/AlbumDetailScreen";
import AddTrackScreen from "../../../screens/AddScreens/AddTrackScreen";
import AddAlbumScreen from "../../../screens/AddScreens/AddAlbumScreen";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const ArtistsStackNavigator = () => {
	const { isDarkMode } = useTheme();
	const { t } = useTranslation();

	return (
		<Stack.Navigator
			initialRouteName="ArtistsScreen"
			screenOptions={{
				headerStyle: {
					backgroundColor: isDarkMode ? "black" : "white",
				},
				headerTintColor: isDarkMode ? "white" : "black",
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
				name="ArtistsScreen"
				component={ArtistsScreen}
				options={{ title: t("artistsTitle") }}
			/>
			<Stack.Screen
				name="AddArtistScreen"
				component={AddArtistScreen}
				options={{ title: t("addArtistTitle") }}
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

export default ArtistsStackNavigator;
