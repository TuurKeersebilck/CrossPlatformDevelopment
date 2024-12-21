import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleArtistFavorite } from "../api/api_calls";
import { Themes } from "../styling/Themes";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const ArtistHeader = ({ artist, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(artist.favorite);
	const [error, setError] = useState(null);
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const {
		header,
		image,
		name,
		bio,
		favoriteButton,
		buttonContainer,
		errorText,
	} = createStyles(currentTheme);

	const toggleFavorite = async () => {
		try {
			const response = await toggleArtistFavorite(artist.id, !isFavorited);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			} else {
				setError(t("favoriteUpdateFailed"));
			}
		} catch (error) {
			setError(t("favoriteUpdateFailed"));
		}
	};

	return (
		<View style={header}>
			{artist && (
				<>
					<Image
						source={{ uri: artist.imgUrl }}
						style={image}
						accessibilityRole="image"
						accessibilityLabel={t("artistImage", { name: artist.name })}
					/>
					<Text
						style={name}
						accessibilityRole="header"
						accessibilityLabel={t("artistName", { name: artist.name })}
					>
						{artist.name}
					</Text>
					<Text
						style={bio}
						accessibilityLabel={t("artistBio", { bio: artist.bio })}
					>
						{artist.bio}
					</Text>
					<TouchableOpacity
						onPress={toggleFavorite}
						style={favoriteButton}
						accessibilityRole="button"
						accessibilityLabel={
							isFavorited
								? t("removeFromFavorites", { name: artist.name })
								: t("addToFavorites", { name: artist.name })
						}
					>
						<Ionicons
							name={isFavorited ? "heart" : "heart-outline"}
							size={30}
							color={currentTheme.accent}
						/>
					</TouchableOpacity>
					<View style={buttonContainer}>
						<Button
							title={t("addTrackButton")}
							onPress={() =>
								navigation.navigate("AddTrackScreen", { artistId: artist.id })
							}
							accessibilityRole="button"
							accessibilityLabel={t("addTrackButton")}
						/>
						<Button
							title={t("addAlbumButton")}
							onPress={() =>
								navigation.navigate("AddAlbumScreen", { artistId: artist.id })
							}
							accessibilityRole="button"
							accessibilityLabel={t("addAlbumButton")}
						/>
					</View>
					{error && (
						<Text style={errorText} accessibilityLabel={t("error", { error })}>
							{error}
						</Text>
					)}
				</>
			)}
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		header: {
			alignItems: "center",
			paddingVertical: 20,
			paddingHorizontal: 16,
			backgroundColor: theme.background,
		},
		image: {
			width: 200,
			height: 200,
			marginBottom: 20,
		},
		name: {
			fontSize: theme.fontSizes.xlarge,
			fontWeight: theme.fontWeights.bold,
			marginBottom: 10,
			textAlign: "center",
			color: theme.primaryText,
		},
		bio: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginBottom: 20,
			paddingHorizontal: 20,
			color: theme.secondaryText,
		},
		favoriteButton: {
			marginBottom: 10,
		},
		buttonContainer: {
			flexDirection: "column",
			justifyContent: "space-between",
			width: "50%",
			paddingHorizontal: 20,
			marginTop: 20,
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
	});

export default ArtistHeader;
