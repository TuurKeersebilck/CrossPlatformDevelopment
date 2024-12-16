import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const LoadingIndicator = () => {
	const { isDarkMode } = useTheme();

	return (
		<View
			style={[
				styles.centered,
				{ backgroundColor: isDarkMode ? "black" : "#F2F2F2" },
			]}
		>
			<ActivityIndicator size="large" color={isDarkMode ? "white" : "black"} />
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoadingIndicator;
