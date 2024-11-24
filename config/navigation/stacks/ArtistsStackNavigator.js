import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/ArtistsScreen";
import TrackDetailScreen from "../../../screens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/ArtistDetailScreen";

const Stack = createStackNavigator();

const ArtistsStackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="ArtistsHome">
			<Stack.Screen
				name="ArtistsHome"
				component={HomeScreen}
				options={{ title: "Artists" }}
			/>
			<Stack.Screen
				name="TrackDetail"
				component={TrackDetailScreen}
				options={({ route }) => ({ title: route.params.track.title })}
			/>
			<Stack.Screen
				name="ArtistDetail"
				component={ArtistDetailScreen}
				options={({ route }) => ({ title: route.params.artist.name })}
			/>
		</Stack.Navigator>
	);
};

export default ArtistsStackNavigator;
