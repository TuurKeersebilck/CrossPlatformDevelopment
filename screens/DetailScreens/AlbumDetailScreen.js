import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import TrackRow from "../../components/rows/TrackRow";
import { getTracksFromAlbum } from "../../api/api_calls";
import LoadingIndicator from "../../components/Loading";

const AlbumDetailScreen = ({ route, navigation }) => {
	const { album } = route.params;
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		container,
		albumImage,
		albumTitle,
		albumArtist,
		releaseDate,
		trackList,
		errorText,
	} = createStyles(theme);

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
			<View style={container}>
				<Text style={errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={container}>
			<Image
				source={{ uri: album.imgUrl }}
				style={albumImage}
				accessibilityRole="image"
				accessibilityLabel={`Image of album ${album.title}`}
			/>
			<Text style={albumTitle}>{album.title}</Text>
			<Text style={albumArtist}>{album.artist}</Text>
			<Text style={releaseDate}>
				Released: {new Date(album.releaseDate).toLocaleDateString()}
			</Text>
			<FlatList
				data={tracks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TrackRow track={item} navigation={navigation} />
				)}
				contentContainerStyle={trackList}
			/>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: theme.background,
		},
		albumImage: {
			width: 200,
			height: 200,
			alignSelf: "center",
			marginBottom: 16,
		},
		albumTitle: {
			fontSize: theme.fontSizes.xlarge,
			fontWeight: theme.fontWeights.bold,
			textAlign: "center",
			marginBottom: 8,
			color: theme.primaryText,
		},
		albumArtist: {
			fontSize: theme.fontSizes.large,
			textAlign: "center",
			marginBottom: 8,
			color: theme.secondaryText,
		},
		releaseDate: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginBottom: 16,
			color: theme.secondaryText,
		},
		trackList: {
			paddingBottom: 16,
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
	});

export default AlbumDetailScreen;
