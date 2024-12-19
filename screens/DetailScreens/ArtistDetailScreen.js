import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TrackRow from "../../components/rows/TrackRow";
import ArtistHeader from "../../components/ArtistHeader";
import AlbumRow from "../../components/rows/AlbumRow";
import {
	fetchArtistAlbums,
	fetchArtistDetails,
	fetchArtistSingles,
} from "../../api/api_calls";
import { Themes } from "../../styling/Themes";
import LoadingIndicator from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const ArtistDetailScreen = ({ route, navigation }) => {
	const { artistId } = route.params;
	const [artist, setArtist] = useState(null);
	const [sections, setSections] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const {
		container,
		errorText,
		sectionList,
		sectionHeader,
		sectionHeaderText,
	} = createStyles(theme);

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
				id: album.id,
				favorite: album.favorite,
			}));

			const singlesSection = {
				title: "Singles",
				data: singles,
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

	useFocusEffect(
		useCallback(() => {
			fetchArtistData();
		}, [artistId])
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	const renderSectionHeader = ({ section }) => {
		if (section.title === "Albums" || section.title === "Singles") {
			return (
				<View
					style={sectionHeader}
					accessibilityRole="header"
					accessibilityLabel={`${section.title} section`}
				>
					<Text style={sectionHeaderText}>{section.title}</Text>
				</View>
			);
		} else {
			return <AlbumRow album={section} navigation={navigation} />;
		}
	};

	return (
		<View style={container}>
			{error && <Text style={errorText}>{error}</Text>}
			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				renderSectionHeader={renderSectionHeader}
				renderItem={({ item }) => (
					<TrackRow
						track={item}
						navigation={navigation}
						accessibilityRole="button"
						accessibilityLabel={`Track: ${item.title}`}
					/>
				)}
				ListHeaderComponent={() =>
					artist && (
						<ArtistHeader
							artist={artist}
							navigation={navigation}
							accessibilityRole="header"
							accessibilityLabel={`Artist: ${artist.name}`}
						/>
					)
				}
				contentContainerStyle={sectionList}
				accessibilityRole="list"
				accessibilityLabel="List of artist details"
			/>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: theme.background,
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
		sectionList: {
			paddingBottom: 20,
			backgroundColor: theme.background,
		},
		sectionHeader: {
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: theme.border,
			backgroundColor: theme.headerBackground,
		},
		sectionHeaderText: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
	});

export default ArtistDetailScreen;
