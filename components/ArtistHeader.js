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

const ArtistHeader = ({ artist, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(artist.favorite);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		header,
		image,
		name,
		bio,
		favoriteButton,
		buttonContainer,
		errorText,
	} = createStyles(theme);

	const toggleFavorite = async () => {
		try {
			const response = await toggleArtistFavorite(artist.id, !isFavorited);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			} else {
				setError("Failed to update favorite status.");
			}
		} catch (error) {
			setError("Failed to update favorite status.");
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
						accessibilityLabel={`Image of artist ${artist.name}`}
					/>
					<Text
						style={name}
						accessibilityRole="header"
						accessibilityLabel={`Artist name: ${artist.name}`}
					>
						{artist.name}
					</Text>
					<Text style={bio} accessibilityLabel={`Artist bio: ${artist.bio}`}>
						{artist.bio}
					</Text>
					<TouchableOpacity
						onPress={toggleFavorite}
						style={favoriteButton}
						accessibilityRole="button"
						accessibilityLabel={
							isFavorited
								? `Remove ${artist.name} from favorites`
								: `Add ${artist.name} to favorites`
						}
					>
						<Ionicons
							name={isFavorited ? "heart" : "heart-outline"}
							size={30}
							color={theme.accent}
						/>
					</TouchableOpacity>
					<View style={buttonContainer}>
						<Button
							title="Add Track"
							onPress={() =>
								navigation.navigate("AddTrackScreen", { artistId: artist.id })
							}
							accessibilityRole="button"
							accessibilityLabel="Add artist"
						/>
						<Button
							title="Add Album"
							onPress={() =>
								navigation.navigate("AddAlbumScreen", { artistId: artist.id })
							}
							accessibilityRole="button"
							accessibilityLabel="Add artist"
						/>
					</View>
					{error && (
						<Text style={errorText} accessibilityLabel={`Error: ${error}`}>
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
			flexDirection: "row",
			justifyContent: "space-between",
			width: "25%",
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
	});

export default ArtistHeader;
