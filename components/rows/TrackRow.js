import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { toggleTrackFavorite } from "../../api/api_calls";
import { Colors } from "../../styling/Colors";

const TrackRow = ({ track, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(track.favorite);
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;

	const toggleFavorite = async () => {
		try {
			const response = await toggleTrackFavorite(track.id, !isFavorited);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			}
		} catch (error) {
			console.error("Failed to update favorite status:", error.message);
		}
	};

	const screenWidth = Dimensions.get("window").width;
	const isMobile = screenWidth < 600;

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("TrackDetail", {
					trackId: track.id,
					title: track.title,
				})
			}
			style={styles.container}
			accessibilityRole="button"
			accessibilityLabel={`View details for track ${track.title}`}
		>
			<View style={styles.track}>
				<Image
					source={{ uri: track.imgUrl }}
					style={styles.trackImage}
					accessibilityRole="image"
					accessibilityLabel={`Image of track ${track.title}`}
				/>
				<View style={styles.trackInfo}>
					<Text
						style={[styles.trackTitle, { color: colors.primaryText }]}
						accessibilityRole="header"
						accessibilityLabel={`Track title: ${track.title}`}
					>
						{track.title}
					</Text>
					<Text
						style={[styles.artistName, { color: colors.secondaryText }]}
						accessibilityLabel={`Artist name: ${track.artistName}`}
					>
						{track.artistName}
					</Text>
				</View>

				<View style={styles.trackAlbum}>
					<Text
						style={[styles.albumTitle, isDarkMode && styles.albumTitleDark]}
						accessibilityLabel={`Album title: ${track.albumTitle}`}
					>
						{track.albumTitle}
					</Text>
				</View>
				{!isMobile && (
					<View style={styles.trackDurationContainer}>
						<Text
							style={[
								styles.trackDuration,
								isDarkMode && styles.trackDurationDark,
							]}
							accessibilityLabel={`Track duration: ${track.duration}`}
						>
							{track.duration}
						</Text>
					</View>
				)}

				<TouchableOpacity
					onPress={toggleFavorite}
					style={styles.favoriteButton}
					accessibilityRole="button"
					accessibilityLabel={
						isFavorited
							? `Remove ${track.title} from favorites`
							: `Add ${track.title} to favorites`
					}
				>
					<Ionicons
						name={isFavorited ? "heart" : "heart-outline"}
						size={24}
						color={colors.accent}
					/>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		marginVertical: 4,
		marginHorizontal: 8,
	},
	track: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 8,
	},
	trackImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12,
	},
	trackInfo: {
		flex: 1,
		justifyContent: "center",
	},
	trackTitle: {
		fontSize: 16,
		fontWeight: "600",
	},
	artistName: {
		fontSize: 14,
		marginTop: 4,
	},
	favoriteButton: {
		marginLeft: 10,
	},
	trackDurationContainer: {
		marginLeft: 10,
	},
	trackDuration: {
		fontSize: 14,
		color: "#888",
	},
	trackDurationDark: {
		color: "#ccc",
	},
	albumTitle: {
		fontSize: 14,
	},
	albumTitleDark: {
		color: "#ccc",
	},
	trackAlbum: {
		marginLeft: "auto",
		justifyContent: "center",
	},
});

export default TrackRow;
