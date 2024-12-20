import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../../screens/SearchScreen";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AddTrackScreen from "../../../screens/AddScreens/AddTrackScreen";
import AddAlbumScreen from "../../../screens/AddScreens/AddAlbumScreen";
import AlbumDetailScreen from "../../../screens/DetailScreens/AlbumDetailScreen";
import TrackDetailScreen from "../../../screens/DetailScreens/TrackDetailScreen";
import ArtistDetailScreen from "../../../screens/DetailScreens/ArtistDetailScreen";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

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
        options={{ title: t("searchTitle") }}
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
      <Stack.Screen
        name="ArtistDetailScreen"
        component={ArtistDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="TrackDetailScreen"
        component={TrackDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;