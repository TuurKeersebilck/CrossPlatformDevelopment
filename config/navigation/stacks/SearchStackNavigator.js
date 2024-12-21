import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import { Themes } from "../../../styling/Themes";
import { useTranslation } from "react-i18next";
import SearchScreen from "../../../screens/SearchScreen";
import AlbumDetailScreen from "../../../screens/DetailScreens/AlbumDetailScreen";
import ArtistDetailScreen from "../../../screens/DetailScreens/ArtistDetailScreen";
import TrackDetailScreen from "../../../screens/DetailScreens/TrackDetailScreen";
import AddTrackScreen from "../../../screens/AddScreens/AddTrackScreen";
import AddAlbumScreen from "../../../screens/AddScreens/AddAlbumScreen";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
	const { theme } = useTheme();
	const currentTheme = Themes[theme];
	const { t } = useTranslation();

	return (
		<Stack.Navigator
			initialRouteName="SearchScreen"
			screenOptions={{
				headerStyle: {
					backgroundColor: currentTheme.background,
				},
				headerTintColor: currentTheme.primaryText,
				headerBackTitleStyle: {
					color: currentTheme.primaryText,
				},
				headerBackImage: () => (
					<Ionicons name="arrow-back" size={24} color={currentTheme.accent} />
				),
			}}
		>
			<Stack.Screen
				name="SearchScreen"
				component={SearchScreen}
				options={{ title: t("searchTitle") }}
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

export default SearchStackNavigator;
