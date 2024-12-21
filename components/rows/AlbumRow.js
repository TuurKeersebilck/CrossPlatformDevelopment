import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { toggleAlbumFavorite } from "../../api/api_calls";
import { Themes } from "../../styling/Themes";
import { useTranslation } from "react-i18next";

const AlbumRow = ({ album, navigation }) => {
	const [isFavorited, setIsFavorited] = useState(album.favorite);
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const {
		container,
		albumRow,
		albumImage,
		albumInfo,
		albumTitle,
		albumArtist,
		favoriteButton,
	} = createStyles(currentTheme);

	const toggleFavorite = async () => {
		try {
			const response = await toggleAlbumFavorite(album.id, !isFavorited);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			} else {
				console.error(t("favoriteUpdateFailed"));
			}
		} catch (error) {
			console.error(t("favoriteUpdateFailed"), error.message);
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
				accessibilityLabel={t("viewAlbumDetails", { title: album.title })}
				accessibilityHint={t("navigateToAlbumDetails")}
			>
				<Image
					source={{ uri: album.imgUrl }}
					style={albumImage}
					accessibilityRole="image"
					accessibilityLabel={t("albumImage", { title: album.title })}
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
						? t("removeFromFavorites", { title: album.title })
						: t("addToFavorites", { title: album.title })
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
			padding: 10,
		},
	});

export default AlbumRow;
