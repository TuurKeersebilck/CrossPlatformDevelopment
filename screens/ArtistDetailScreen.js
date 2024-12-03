import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	SectionList,
	TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import TrackRow from "../components/tracklist/trackRow";
import {
	fetchArtistAlbums,
	fetchArtistDetails,
	toggleArtistFavorite,
} from "../api/api_calls";

const ArtistDetailScreen = ({ route, navigation }) => {
	const { artistId } = route.params;
	const { isDarkMode } = useTheme();
	const [artist, setArtist] = useState(null);
	const [sections, setSections] = useState([]);
	const [isFavorited, setIsFavorited] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getArtistDetails = async () => {
			try {
				const artistDetails = await fetchArtistDetails(artistId);
				if (artistDetails.error) {
					setError(artistDetails.error);
				} else {
					setArtist(artistDetails);
					setIsFavorited(artistDetails.favorite);
				}
			} catch (error) {
				setError("Failed to fetch artist details. Please try again.");
			}
		};

		const getAlbums = async () => {
			try {
				const albums = await fetchArtistAlbums(artistId);
				if (albums.error) {
					setError(albums.error);
				} else {
					const sectionsData = albums.map((album) => ({
						title: album.title,
						imgUrl: album.imgUrl,
						data: album.tracks,
					}));
					setSections(sectionsData);
				}
			} catch (error) {
				setError("Failed to fetch albums. Please try again.");
			}
		};

		getArtistDetails();
		getAlbums();
	}, [artistId]);

	const toggleFavorite = async () => {
		try {
			const response = await toggleArtistFavorite(artistId);
			if (response.success) {
				setIsFavorited(response.isFavorited);
			} else {
				setError("Failed to update favorite status. Please try again.");
			}
		} catch (error) {
			setError("Failed to update favorite status. Please try again.");
		}
	};

	const renderAlbumHeader = ({ section }) => (
		<View
			style={[styles.sectionHeader, isDarkMode && styles.sectionHeaderDark]}
		>
			<Image source={{ uri: section.imgUrl }} style={styles.albumImage} />
			<Text
				style={[
					styles.sectionHeaderText,
					isDarkMode && styles.sectionHeaderTextDark,
				]}
			>
				{section.title}
			</Text>
		</View>
	);

	const renderAlbumTrack = ({ item }) => (
		<TrackRow track={item} navigation={navigation} />
	);

	const renderArtist = () => (
		<View style={styles.header}>
			{artist && (
				<>
					<Image source={{ uri: artist.imgUrl }} style={styles.image} />
					<Text style={[styles.name, isDarkMode && styles.nameDark]}>
						{artist.name}
					</Text>
					<Text style={[styles.bio, isDarkMode && styles.bioDark]}>
						{artist.bio}
					</Text>
					<TouchableOpacity
						onPress={toggleFavorite}
						style={styles.favoriteButton}
					>
						<Ionicons
							name={isFavorited ? "heart" : "heart-outline"}
							size={30}
							color={isFavorited ? "red" : "gray"}
						/>
					</TouchableOpacity>
				</>
			)}
		</View>
	);

	return (
		<View style={[styles.container, isDarkMode && styles.containerDark]}>
			{error && (
				<Text style={[styles.errorText, isDarkMode && styles.errorTextDark]}>
					{error}
				</Text>
			)}
			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				renderSectionHeader={renderAlbumHeader}
				renderItem={renderAlbumTrack}
				ListHeaderComponent={renderArtist}
				contentContainerStyle={[
					styles.sectionList,
					isDarkMode && styles.sectionListDark,
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "white",
	},
	containerDark: {
		backgroundColor: "black",
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		color: "black",
	},
	nameDark: {
		color: "white",
	},
	bio: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "black",
	},
	bioDark: {
		color: "white",
	},
	favoriteButton: {
		marginBottom: 20,
	},
	sectionHeader: {
		backgroundColor: "#f4f4f4",
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	sectionHeaderDark: {
		backgroundColor: "#333",
	},
	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
		marginLeft: 10,
	},
	sectionHeaderTextDark: {
		color: "white",
	},
	albumImage: {
		width: 50,
		height: 50,
	},
	errorText: {
		fontSize: 16,
		color: "red",
		textAlign: "center",
		marginTop: 20,
	},
	errorTextDark: {
		color: "lightcoral",
	},
	sectionList: {
		paddingBottom: 20,
	},
	sectionListDark: {
		backgroundColor: "black",
	},
});

export default ArtistDetailScreen;
