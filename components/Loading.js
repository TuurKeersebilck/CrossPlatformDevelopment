import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import { useTranslation } from "react-i18next";

const Loading = () => {
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();
	const { centered } = createStyles(theme);

	return (
		<View
			style={centered}
			accessibilityRole="alert"
			accessibilityLabel={t("loadingContent")}
		>
			<ActivityIndicator
				size="large"
				color={isDarkMode ? "white" : "black"}
				accessibilityRole="progressbar"
				accessibilityLabel={t("loadingIndicator")}
			/>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		centered: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.backgroundColor,
		},
	});

export default Loading;
