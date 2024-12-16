import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { useTheme } from "../context/ThemeContext";
import TrackRow from "../components/rows/TrackRow";
import ArtistHeader from "../components/headers/ArtistHeader";
import AlbumHeader from "../components/headers/AlbumHeader";
import {
	fetchArtistAlbums,
	fetchArtistDetails,
	fetchArtistSingles,
} from "../api/api_calls";
import { Colors } from "../styling/Colors";
import LoadingIndicator from "../components/Loading";

const ArtistDetailScreen = ({ route, navigation }) => {
	const { artistId } = route.params;
	const { isDarkMode } = useTheme();
	const [artist, setArtist] = useState(null);
	const [sections, setSections] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const colors = isDarkMode ? Colors.dark : Colors.light;

	useEffect(() => {
		const fetchArtistData = async () => {
			try {
				const [artistDetails, albums, singles] = await Promise.all([
					fetchArtistDetails(artistId),
					fetchArtistAlbums(artistId),
					fetchArtistSingles(artistId),
				]);

				if (artistDetails.error || albums.error || singles.error) {
					throw new Error(artistDetails.error || albums.error || singles.error);
				}

				setArtist(artistDetails);
				const albumSections = albums.map((album) => ({
					title: album.title,
					imgUrl: album.imgUrl,
					data: album.tracks,
					releaseDate: album.releaseDate,
					albumId: album.id,
					favorite: album.favorite,
				}));

				const singlesSection = {
					title: "Singles",
					imgUrl: null,
					data: singles,
					releaseDate: null,
					albumId: null,
					favorite: null,
				};

				const sections = singles.length > 0 ? [singlesSection] : [];
				if (albums.length > 0) {
					sections.push({ title: "Albums", data: [] }, ...albumSections);
				}

				setSections(sections);
			} catch (error) {
				setError("Failed to load artist data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchArtistData();
	}, [artistId]);

	if (loading) {
		return <LoadingIndicator />;
	}

	const renderSectionHeader = ({ section }) => {
		if (section.title === "Singles" || section.title === "Albums") {
			return (
				<View
					style={[styles.sectionHeader, { backgroundColor: colors.background }]}
				>
					<Text
						style={[styles.sectionHeaderText, { color: colors.primaryText }]}
					>
						{section.title}
					</Text>
				</View>
			);
		} else {
			return <AlbumHeader section={section} isDarkMode={isDarkMode} />;
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			{error && (
				<Text style={[styles.errorText, { color: colors.errorText }]}>
					{error}
				</Text>
			)}
			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				renderSectionHeader={renderSectionHeader}
				renderItem={({ item }) => (
					<TrackRow track={item} navigation={navigation} />
				)}
				ListHeaderComponent={() => (
					<ArtistHeader artist={artist} isDarkMode={isDarkMode} />
				)}
				contentContainerStyle={[
					styles.sectionList,
					{ backgroundColor: colors.background },
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	errorText: {
		fontSize: 16,
		textAlign: "center",
		marginTop: 20,
	},
	sectionList: {
		paddingBottom: 20,
	},
	sectionHeader: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	sectionHeaderText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default ArtistDetailScreen;
