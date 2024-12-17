import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";

const SettingsScreen = ({ navigation }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;

	const handleAddPress = () => {
		navigation.navigate("AddItemScreen");
	};

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text
				style={[styles.text, { color: colors.primaryText }]}
				accessibilityRole="header"
				accessibilityLabel="Settings"
			>
				Settings
			</Text>
			<Button
				title="Toggle Theme"
				onPress={toggleTheme}
				accessibilityRole="button"
				accessibilityLabel="Toggle between light and dark theme"
			/>
			<TouchableOpacity
				style={[styles.addButton, { backgroundColor: colors.accent }]}
				onPress={handleAddPress}
				accessibilityRole="button"
				accessibilityLabel="Add Artist, Album, or Track"
			>
				<Text style={[styles.addButtonText, { color: colors.primaryText }]}>
					Add Artist/Album/Track
				</Text>
			</TouchableOpacity>
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
	addButton: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	addButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default SettingsScreen;
