import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { toggleAlbumFavorite } from "../../api/api_calls";
import { Themes } from "../../styling/Themes";

const AlbumRow = ({ album, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(album.favorite);
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Themes.dark : Themes.light;

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
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("AlbumDetailScreen", {
						album: album,
					})
				}
				style={styles.album}
				accessibilityRole="button"
				accessibilityLabel={`View details for album ${album.title}`}
			>
				<Image
					source={{ uri: album.imgUrl }}
					style={styles.albumImage}
					accessibilityRole="image"
					accessibilityLabel={`Image of album ${album.title}`}
				/>
				<View style={styles.albumInfo}>
					<Text style={[styles.albumTitle, { color: colors.primaryText }]}>
						{album.title}
					</Text>
					<Text style={[styles.albumArtist, { color: colors.secondaryText }]}>
						{album.artist}
					</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={toggleFavorite}
				style={styles.favoriteButton}
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
					color={colors.accent}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 8,
		marginVertical: 4,
		marginHorizontal: 8,
	},
	album: {
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
		fontSize: 16,
		fontWeight: "bold",
	},
	albumArtist: {
		fontSize: 14,
		marginTop: 4,
	},
	favoriteButton: {
		marginLeft: 10,
	},
});

export default AlbumRow;
