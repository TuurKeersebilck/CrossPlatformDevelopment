import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/TracksScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";

const Stack = createStackNavigator();

const TracksStackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Tracks">
			<Stack.Screen name="Tracks" component={HomeScreen} />
			<Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
		</Stack.Navigator>
	);
};

export default TracksStackNavigator;
