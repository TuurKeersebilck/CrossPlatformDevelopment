import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import { useTranslation } from "react-i18next";

const Loading = () => {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { centered } = createStyles(currentTheme);

	return (
		<View
			style={centered}
			accessibilityRole="alert"
			accessibilityLabel={t("loadingContent")}
		>
			<ActivityIndicator
				size="large"
				color={currentTheme.primaryText}
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
			backgroundColor: theme.background,
		},
	});

export default Loading;
