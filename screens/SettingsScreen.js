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
		<View style={styles.favoriteSection}>
			<View style={styles.sectionHeader}>
				<Text
					style={[
						styles.sectionTitle,
						{
							color: theme.primaryText,
							fontSize: theme.fontSizes.large,
							fontWeight: theme.fontWeights.bold,
						},
					]}
				>
					{title}
				</Text>
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
					contentContainerStyle={styles.favoriteList}
				/>
			) : (
				<Text
					style={[
						styles.emptyStateText,
						{ color: theme.secondaryText, fontSize: theme.fontSizes.medium },
					]}
				>
					No {title.toLowerCase()} yet
				</Text>
			)}
		</View>
	);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: theme.background }]}
		>
			<View style={styles.darkModeSection}>
				<Text
					style={[
						styles.sectionTitle,
						{
							color: theme.primaryText,
							fontSize: theme.fontSizes.large,
							fontWeight: theme.fontWeights.bold,
						},
					]}
				>
					Dark Mode
				</Text>
				<TouchableOpacity onPress={toggleTheme} style={styles.headerIconButton}>
					<Icon
						name={isDarkMode ? "sunny" : "moon"}
						size={25}
						color={theme.primaryText}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.headerContainer}>
				<Text
					style={{
						color: theme.primaryText,
						fontSize: theme.fontSizes.xlarge,
						fontWeight: theme.fontWeights.bold,
					}}
				>
					Your Library
				</Text>
			</View>

			<FlatList
				data={[
					{ title: "Favorite Artists", data: favoriteArtists, type: "artist" },
					{ title: "Favorite Tracks", data: favoriteTracks, type: "track" },
					{ title: "Favorite Albums", data: favoriteAlbums, type: "album" },
				]}
				keyExtractor={(item) => item.title}
				renderItem={({ item }) =>
					renderFavoriteSection(item.title, item.data, item.type)
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 20,
	},
	headerActions: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerIconButton: {
		marginLeft: 15,
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
	emptyStateText: {
		textAlign: "center",
		fontStyle: "italic",
	},
	darkModeSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		paddingHorizontal: 15,
	},
});

export default SettingsScreen;
