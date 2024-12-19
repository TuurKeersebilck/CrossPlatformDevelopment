import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistsScreen from "../../../screens/ArtistsScreen";
import AddArtistScreen from "../../../screens/ArtistsScreen";
import TrackDetailScreen from "../../../screens/DetailScreens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/DetailScreens/ArtistDetailScreen";
import AlbumDetailScreen from "../../../screens/DetailScreens/AlbumDetailScreen";
import AddTrackScreen from "../../../screens/AddScreens/AddTrackScreen";
import AddAlbumScreen from "../../../screens/AddScreens/AddAlbumScreen";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const ArtistsStackNavigator = () => {
	const { isDarkMode } = useTheme();

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
				options={{ title: "Artists" }}
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
				name="AddTrackScreen"
				component={AddTrackScreen}
				options={{ title: "Add Track" }}
			/>
			<Stack.Screen
				name="AddAlbumScreen"
				component={AddAlbumScreen}
				options={{ title: "Add Album" }}
			/>
			<Stack.Screen
				name="AlbumDetailScreen"
				component={AlbumDetailScreen}
				options={({ route }) => ({ title: route.params.title })}
			/>
			<Stack.Screen
				name="AddArtistScreen"
				component={AddArtistScreen}
				options={{ title: "Add Artist" }}
			/>
		</Stack.Navigator>
	);
};

export default ArtistsStackNavigator;
