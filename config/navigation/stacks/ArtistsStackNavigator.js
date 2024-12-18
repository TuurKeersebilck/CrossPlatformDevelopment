import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ArtistsScreen from "../../../screens/ArtistsScreen";
import TrackDetailScreen from "../../../screens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/ArtistDetailScreen";
import AddArtistScreen from "../../../screens/AddArtistScreen";
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
                name="TrackDetail"
                component={TrackDetailScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
                name="ArtistDetail"
                component={ArtistDetailScreen}
                options={({ route }) => ({ title: route.params.name })}
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