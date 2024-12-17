import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import {
	getFavoriteArtists,
	getFavoriteTracks,
	getFavoriteAlbums,
} from "../api/api_calls";

const SettingsScreen = ({ navigation }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;

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

	const handleAddPress = () => {
		navigation.navigate("AddItemScreen");
	};

	const renderFavoriteItem = ({ item }) => (
		<View
			style={[styles.favoriteItem, { backgroundColor: colors.cardBackground }]}
		>
			<Text style={[styles.favoriteItemText, { color: colors.primaryText }]}>
				{item.name || item.title}
			</Text>
		</View>
	);

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Button
				title="Toggle Theme"
				onPress={toggleTheme}
				accessibilityRole="button"
				accessibilityLabel="Toggle between light and dark theme"
			/>
			<TouchableOpacity
				style={[styles.addButton, { backgroundColor: colors.accent }]}
				onPress={handleAddPress}
				accessibilityRole="button"
				accessibilityLabel="Add Artist, Album, or Track"
			>
				<Text style={[styles.addButtonText, { color: colors.primaryText }]}>
					Add Artist/Album/Track
				</Text>
			</TouchableOpacity>
			<Text
				style={[styles.subHeader, { color: colors.primaryText }]}
				accessibilityRole="header"
				accessibilityLabel="Favorite Artists"
			>
				Favorite Artists
			</Text>
			<FlatList
				data={favoriteArtists}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFavoriteItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.favoriteList}
			/>
			<Text
				style={[styles.subHeader, { color: colors.primaryText }]}
				accessibilityRole="header"
				accessibilityLabel="Favorite Tracks"
			>
				Favorite Tracks
			</Text>
			<FlatList
				data={favoriteTracks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFavoriteItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.favoriteList}
			/>
			<Text
				style={[styles.subHeader, { color: colors.primaryText }]}
				accessibilityRole="header"
				accessibilityLabel="Favorite Albums"
			>
				Favorite Albums
			</Text>
			<FlatList
				data={favoriteAlbums}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFavoriteItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.favoriteList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	subHeader: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
		marginBottom: 10,
	},
	addButton: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignSelf: "center",
	},
	addButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	favoriteList: {
		paddingVertical: 10,
	},
	favoriteItem: {
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
	},
	favoriteItemText: {
		fontSize: 16,
	},
});

export default SettingsScreen;
