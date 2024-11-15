import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Search">
			<Stack.Screen name="Search" component={SearchScreen} />
			<Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
		</Stack.Navigator>
	);
};

export default SearchStackNavigator;
