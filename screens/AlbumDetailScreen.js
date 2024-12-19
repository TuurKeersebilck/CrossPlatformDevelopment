import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import TrackRow from "../components/rows/TrackRow";
import { getTracksFromAlbum } from "../api/api_calls";
import LoadingIndicator from "../components/Loading";

const AlbumDetailScreen = ({ route, navigation }) => {
	const { album } = route.params;
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Themes.dark : Themes.light;
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTracks = async () => {
			try {
				const tracksData = await getTracksFromAlbum(album.id);
				setTracks(tracksData);
			} catch (err) {
				setError("Failed to load tracks. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchTracks();
	}, [album.id]);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return (
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Text style={[styles.errorText, { color: colors.errorText }]}>
					{error}
				</Text>
			</View>
		);
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Image
				source={{ uri: album.imgUrl }}
				style={styles.albumImage}
				accessibilityRole="image"
				accessibilityLabel={`Image of album ${album.title}`}
			/>
			<Text style={[styles.albumTitle, { color: colors.primaryText }]}>
				{album.title}
			</Text>
			<Text style={[styles.albumArtist, { color: colors.secondaryText }]}>
				{album.artist}
			</Text>
			<Text style={[styles.releaseDate, { color: colors.secondaryText }]}>
				Released: {new Date(album.releaseDate).toLocaleDateString()}
			</Text>
			<FlatList
				data={tracks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TrackRow track={item} navigation={navigation} />
				)}
				contentContainerStyle={styles.trackList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	albumImage: {
		width: 200,
		height: 200,
		alignSelf: "center",
		marginBottom: 16,
	},
	albumTitle: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	albumArtist: {
		fontSize: 18,
		textAlign: "center",
		marginBottom: 8,
	},
	releaseDate: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 16,
	},
	trackList: {
		paddingBottom: 16,
	},
	loadingText: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
});

export default AlbumDetailScreen;
