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
import { Themes } from "../../styling/Themes";

const TrackRow = ({ track, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(track.favorite);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		container,
		trackRow,
		trackImage,
		trackInfo,
		trackTitle,
		artistName,
		favoriteButton,
		trackDurationContainer,
		trackDuration,
		albumTitle,
		trackAlbum,
	} = createStyles(theme);

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
		<View style={container}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("TrackDetailScreen", {
						trackId: track.id,
						title: track.title,
					})
				}
				style={trackRow}
				accessibilityRole="button"
				accessibilityLabel={`View details for track ${track.title}`}
			>
				<Image
					source={{ uri: track.imgUrl }}
					style={trackImage}
					accessibilityRole="image"
					accessibilityLabel={`Image of track ${track.title}`}
				/>
				<View style={trackInfo}>
					<Text
						style={trackTitle}
						accessibilityRole="header"
						accessibilityLabel={`Track title: ${track.title}`}
					>
						{track.title}
					</Text>
					<Text
						style={artistName}
						accessibilityLabel={`Artist name: ${track.artistName}`}
					>
						{track.artistName}
					</Text>
				</View>

				<View style={trackAlbum}>
					<Text
						style={albumTitle}
						accessibilityLabel={`Album title: ${track.albumTitle}`}
					>
						{track.albumTitle}
					</Text>
				</View>
				{!isMobile && (
					<View style={trackDurationContainer}>
						<Text
							style={trackDuration}
							accessibilityLabel={`Track duration: ${track.duration}`}
						>
							{track.duration}
						</Text>
					</View>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				onPress={toggleFavorite}
				style={favoriteButton}
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
		trackRow: {
			flex: 1,
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
			fontSize: theme.fontSizes.medium,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		artistName: {
			fontSize: theme.fontSizes.small,
			marginTop: 4,
			color: theme.secondaryText,
		},
		favoriteButton: {
			marginLeft: 10,
		},
		trackDurationContainer: {
			marginLeft: 10,
		},
		trackDuration: {
			fontSize: theme.fontSizes.small,
			color: theme.secondaryText,
		},
		albumTitle: {
			fontSize: theme.fontSizes.small,
			color: theme.secondaryText,
		},
		trackAlbum: {
			marginLeft: "auto",
			justifyContent: "center",
		},
	});

export default TrackRow;
