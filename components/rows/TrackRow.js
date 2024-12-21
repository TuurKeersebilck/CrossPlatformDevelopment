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
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

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
	} = createStyles(currentTheme);

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
					</View>
				</View>
			</TouchableOpacity>
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
					size={24}
					color={currentTheme.accent}
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
			padding: 10,
			backgroundColor: theme.background,
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
			marginRight: 12,
			borderRadius: 8,
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
	});

export default TrackRow;
