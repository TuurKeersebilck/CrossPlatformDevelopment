import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<View style={[styles.container, isDarkMode && styles.darkContainer]}>
			<Text style={[styles.text, isDarkMode && styles.darkText]}>Settings</Text>
			<Button title="Toggle Theme" onPress={toggleTheme} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	darkContainer: {
		backgroundColor: "black",
	},
	text: {
		color: "black",
	},
	darkText: {
		color: "white",
	},
});

export default SettingsScreen;
