import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../../screens/SearchScreen";
import TrackDetailScreen from "../../../screens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/ArtistDetailScreen";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AddTrackScreen from "../../../screens/AddTrackScreen";
import AddAlbumScreen from "../../../screens/AddAlbumScreen";
import AlbumDetailScreen from "../../../screens/AlbumDetailScreen";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
	const { isDarkMode } = useTheme();

	return (
		<Stack.Navigator
			initialRouteName="SearchScreen"
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
				name="SearchScreen"
				component={SearchScreen}
				options={{ title: "Search" }}
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
		</Stack.Navigator>
	);
};

export default SearchStackNavigator;
