import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { useTranslation } from "react-i18next";

const ArtistRow = ({ artist, navigation }) => {
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();

	const {
		container,
		artistRow,
		artistInfo,
		artistImage,
		artistName,
		artistBio,
	} = createStyles(theme);

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("ArtistDetailScreen", {
					artistId: artist.id,
					name: artist.name,
				})
			}
			style={container}
			accessibilityRole="button"
			accessibilityLabel={t("viewArtistDetails", { name: artist.name })}
		>
			<View style={artistRow}>
				<Image
					source={{ uri: artist.imgUrl }}
					style={artistImage}
					accessibilityRole="image"
					accessibilityLabel={t("artistImage", { name: artist.name })}
				/>
				<View style={artistInfo}>
					<Text style={artistName}>{artist.name}</Text>
					<Text style={artistBio}>{artist.bio}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			borderRadius: 8,
			marginVertical: 4,
			marginHorizontal: 8,
		},
		artistRow: {
			flexDirection: "row",
			alignItems: "center",
			padding: 12,
			borderRadius: 8,
		},
		artistInfo: {
			marginLeft: 12,
			flex: 1,
		},
		artistImage: {
			width: 60,
			height: 60,
			borderRadius: 8,
		},
		artistName: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		artistBio: {
			fontSize: theme.fontSizes.medium,
			marginTop: 4,
			color: theme.secondaryText,
		},
	});

export default ArtistRow;
