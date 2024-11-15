import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SearchScreen from "./screens/SearchScreen";

const Tab = createBottomTabNavigator();

const AppContent = () => {
    const { isDarkMode } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Tracks") {
                        iconName = focused ? "musical-notes" : "musical-notes-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: isDarkMode ? "white" : "tomato",
                tabBarInactiveTintColor: isDarkMode ? "gray" : "gray",
                tabBarStyle: {
                    backgroundColor: isDarkMode ? "black" : "white",
                },
            })}
        >
            <Tab.Screen name="Tracks" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;