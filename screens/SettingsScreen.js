import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import {
	getFavoriteArtists,
	getFavoriteTracks,
	getFavoriteAlbums,
} from "../api/api_calls";
import Icon from "react-native-vector-icons/Ionicons";
import ArtistRow from "../components/rows/ArtistRow";
import TrackRow from "../components/rows/TrackRow";
import AlbumRow from "../components/rows/AlbumRow";

const SettingsScreen = ({ navigation }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		container,
		contentContainer,
		libraryContainer,
		headerIconButton,
		favoriteSection,
		sectionHeader,
		favoriteList,
		emptyStateMessage,
		darkModeSection,
		sectionTitle,
		libraryTitle,
	} = createStyles(theme);

	const [favoriteArtists, setFavoriteArtists] = useState([]);
	const [favoriteTracks, setFavoriteTracks] = useState([]);
	const [favoriteAlbums, setFavoriteAlbums] = useState([]);

	const fetchFavorites = async () => {
		try {
			const [artistsData, tracksData, albumsData] = await Promise.all([
				getFavoriteArtists(),
				getFavoriteTracks(),
				getFavoriteAlbums(),
			]);
			setFavoriteArtists(artistsData);
			setFavoriteTracks(tracksData);
			setFavoriteAlbums(albumsData);
		} catch (error) {
			console.error("Error fetching favorites:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchFavorites();
		}, [])
	);

	const renderFavoriteSection = (title, data, type) => (
		<View style={favoriteSection}>
			<View style={sectionHeader}>
				<Text style={sectionTitle}>{title}</Text>
			</View>
			{data.length > 0 ? (
				<FlatList
					data={data.slice(0, 5)}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						if (type === "artist") {
							return <ArtistRow artist={item} navigation={navigation} />;
						} else if (type === "track") {
							return <TrackRow track={item} navigation={navigation} />;
						} else if (type === "album") {
							return <AlbumRow album={item} navigation={navigation} />;
						}
						return null;
					}}
					contentContainerStyle={favoriteList}
				/>
			) : (
				<Text style={emptyStateMessage}>No {title.toLowerCase()} yet</Text>
			)}
		</View>
	);

	return (
		<SafeAreaView style={container} accessibilityRole="main">
			<View style={contentContainer}>
				<View style={darkModeSection}>
					<Text style={sectionTitle}>Dark Mode</Text>
					<TouchableOpacity
						onPress={toggleTheme}
						style={headerIconButton}
						accessibilityRole="button"
						accessibilityLabel={`Toggle dark mode, currently ${
							isDarkMode ? "enabled" : "disabled"
						}`}
						accessibilityHint="Double tap to toggle dark mode"
					>
						<Icon
							name={isDarkMode ? "sunny" : "moon"}
							size={25}
							color={theme.primaryText}
						/>
					</TouchableOpacity>
				</View>

				<View style={libraryContainer}>
					<Text style={libraryTitle}>Your Library</Text>
					<FlatList
						data={[
							{
								title: "Favorite Artists",
								data: favoriteArtists,
								type: "artist",
							},
							{ title: "Favorite Tracks", data: favoriteTracks, type: "track" },
							{ title: "Favorite Albums", data: favoriteAlbums, type: "album" },
						]}
						keyExtractor={(item) => item.title}
						renderItem={({ item }) =>
							renderFavoriteSection(item.title, item.data, item.type)
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
		},
		contentContainer: {
			flex: 1,
			paddingHorizontal: 20,
		},
		libraryContainer: {
			marginTop: 10,
			marginBottom: 20,
		},
		headerIconButton: {
			padding: 10,
			borderRadius: 5,
			backgroundColor: theme.accent,
		},
		favoriteSection: {
			marginBottom: 20,
		},
		sectionHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 10,
		},
		favoriteList: {
			paddingVertical: 10,
		},
		emptyStateMessage: {
			textAlign: "center",
			fontStyle: "italic",
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
		},
		darkModeSection: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 20,
			padding: 10,
			borderRadius: 5,
		},
		sectionTitle: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		libraryTitle: {
			fontSize: theme.fontSizes.xlarge,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
	});

export default SettingsScreen;
