import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";

const SettingsScreen = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.text, { color: colors.primaryText }]}>Settings</Text>
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default SettingsScreen;