import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { toggleAlbumFavorite } from "../../api/api_calls";
import { Themes } from "../../styling/Themes";

const AlbumRow = ({ album, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(album.favorite);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		container,
		albumRow,
		albumImage,
		albumInfo,
		albumTitle,
		albumArtist,
		favoriteButton,
	} = createStyles(theme);

	const toggleFavorite = async () => {
		try {
			const response = await toggleAlbumFavorite(album.id, !isFavorited);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			} else {
				console.error("Failed to update favorite status.");
			}
		} catch (error) {
			console.error("Failed to update favorite status:", error.message);
		}
	};

	return (
		<View style={container}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("AlbumDetailScreen", {
						album: album,
					})
				}
				style={albumRow}
				accessibilityRole="button"
				accessibilityLabel={`View details for album ${album.title}`}
			>
				<Image
					source={{ uri: album.imgUrl }}
					style={albumImage}
					accessibilityRole="image"
					accessibilityLabel={`Image of album ${album.title}`}
				/>
				<View style={albumInfo}>
					<Text style={albumTitle}>{album.title}</Text>
					<Text style={albumArtist}>{album.artist}</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={toggleFavorite}
				style={favoriteButton}
				accessibilityRole="button"
				accessibilityLabel={
					isFavorited
						? `Remove ${album.title} from favorites`
						: `Add ${album.title} to favorites`
				}
			>
				<Ionicons
					name={isFavorited ? "heart" : "heart-outline"}
					size={24}
					color={theme.accent}
				/>
			</TouchableOpacity>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			borderRadius: 8,
			marginVertical: 4,
			marginHorizontal: 8,
		},
		albumRow: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			padding: 12,
			borderRadius: 8,
		},
		albumImage: {
			width: 60,
			height: 60,
			borderRadius: 8,
			marginRight: 12,
		},
		albumInfo: {
			flex: 1,
			justifyContent: "center",
		},
		albumTitle: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		albumArtist: {
			fontSize: theme.fontSizes.medium,
			marginTop: 4,
			color: theme.secondaryText,
		},
		favoriteButton: {
			marginLeft: 10,
		},
	});

export default AlbumRow;
