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
import { toggleTrackFavorite } from "../../api/api_calls";
import { Themes } from "../../styling/Themes";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const TrackRow = ({ track, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(track.favorite);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();

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
			console.error(t("favoriteUpdateFailed"), error.message);
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
				accessibilityLabel={t("viewTrackDetails", { title: track.title })}
			>
				<Image
					source={{ uri: track.imgUrl }}
					style={trackImage}
					accessibilityRole="image"
					accessibilityLabel={t("trackImage", { title: track.title })}
				/>
				<View style={trackInfo}>
					<Text style={trackTitle}>{track.title}</Text>
					<Text style={artistName}>{track.artistName}</Text>
					<View style={trackDurationContainer}>
						<Text style={trackDuration}>{track.duration}</Text>
						<Text style={albumTitle}>{track.albumTitle}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={toggleFavorite}
					style={favoriteButton}
					accessibilityRole="button"
					accessibilityLabel={
						isFavorited
							? t("removeFromFavorites", { title: track.title })
							: t("addToFavorites", { title: track.title })
					}
				>
					<Ionicons
						name={isFavorited ? "heart" : "heart-outline"}
						size={30}
						color={theme.accent}
					/>
				</TouchableOpacity>
			</TouchableOpacity>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 10,
			backgroundColor: theme.background,
		},
		trackRow: {
			flexDirection: "row",
			alignItems: "center",
			padding: 10,
			borderBottomWidth: 1,
			borderBottomColor: theme.border,
		},
		trackImage: {
			width: 50,
			height: 50,
			marginRight: 10,
		},
		trackInfo: {
			flex: 1,
		},
		trackTitle: {
			fontSize: theme.fontSizes.medium,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		artistName: {
			fontSize: theme.fontSizes.small,
			color: theme.secondaryText,
		},
		favoriteButton: {
			padding: 10,
		},
		trackDurationContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		trackDuration: {
			fontSize: theme.fontSizes.small,
			color: theme.secondaryText,
		},
		albumTitle: {
			fontSize: theme.fontSizes.small,
			color: theme.secondaryText,
		},
	});

export default TrackRow;
