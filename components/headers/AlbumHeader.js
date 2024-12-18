import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleAlbumFavorite } from "../../api/api_calls";
import { Colors } from "../../styling/Colors";

const AlbumHeader = ({ section, isDarkMode }) => {
	const [isFavorited, setIsFavorited] = useState(section.favorite);
	const [error, setError] = useState(null);
	const colors = isDarkMode ? Colors.dark : Colors.light;

	const toggleFavorite = async () => {
		try {
			const response = await toggleAlbumFavorite(
				section.albumId || section.id,
				!isFavorited
			);
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
		<View
			style={[styles.sectionHeader, { backgroundColor: colors.background }]}
			accessibilityRole="header"
			accessibilityLabel={`Album: ${section.title}`}
		>
			<Image
				source={{ uri: section.imgUrl }}
				style={styles.albumImage}
				accessibilityRole="image"
				accessibilityLabel={`Image of album ${section.title}`}
			/>
			<View style={styles.textContainer}>
				<Text
					style={[styles.sectionHeaderText, { color: colors.primaryText }]}
					accessibilityRole="header"
					accessibilityLabel={`Album title: ${section.title}`}
				>
					{section.title}
				</Text>
				<Text
					style={[styles.releaseDateText, { color: colors.secondaryText }]}
					accessibilityLabel={`Release year: ${new Date(
						section.releaseDate
					).getFullYear()}`}
				>
					{new Date(section.releaseDate).getFullYear()}
				</Text>
			</View>
			<TouchableOpacity
				onPress={toggleFavorite}
				style={styles.favoriteButton}
				accessibilityRole="button"
				accessibilityLabel={
					isFavorited
						? `Remove ${section.title} from favorites`
						: `Add ${section.title} to favorites`
				}
			>
				<Ionicons
					name={isFavorited ? "heart" : "heart-outline"}
					size={24}
					color={colors.accent}
				/>
			</TouchableOpacity>
			{error && (
				<Text style={styles.errorText} accessibilityLabel={`Error: ${error}`}>
					{error}
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
	},
	textContainer: {
		marginLeft: 12,
		flex: 1,
	},
	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	releaseDateText: {
		fontSize: 14,
		marginTop: 4,
		color: "#888",
		fontWeight: "bold",
	},
	albumImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	favoriteButton: {
		padding: 8,
	},
	errorText: {
		position: "absolute",
		bottom: -20,
		alignSelf: "center",
		fontSize: 14,
		color: "red",
	},
});

export default AlbumHeader;
