import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import TrackRow from "../components/rows/TrackRow";
import ArtistRow from "../components/rows/ArtistRow";
import AlbumRow from "../components/rows/AlbumRow";
import { getArtists, getTracks, getAlbums } from "../api/api_calls";
import { Themes } from "../styling/Themes";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

const SearchScreen = ({ navigation }) => {
	const [query, setQuery] = useState("");
	const [filteredTracks, setFilteredTracks] = useState([]);
	const [filteredArtists, setFilteredArtists] = useState([]);
	const [filteredAlbums, setFilteredAlbums] = useState([]);
	const [allTracks, setAllTracks] = useState([]);
	const [allArtists, setAllArtists] = useState([]);
	const [allAlbums, setAllAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];
	const { container, input, scrollView, emptyResult, placeholder } =
		createStyles(currentTheme);

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const [artistsData, tracksData, albumsData] = await Promise.all([
						getArtists(),
						getTracks(),
						getAlbums(),
					]);

					setQuery("");
					setAllArtists(artistsData);
					setFilteredArtists(artistsData);
					setAllTracks(tracksData);
					setFilteredTracks(tracksData);
					setAllAlbums(albumsData);
					setFilteredAlbums(albumsData);
				} catch (error) {
					console.error("Error fetching data:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}, [])
	);

	const handleSearch = (text) => {
		setQuery(text);
		if (text) {
			const filteredArtists = allArtists.filter((artist) =>
				artist.name.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredArtists(filteredArtists);

			const filteredTracks = allTracks.filter((track) =>
				track.title.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredTracks(filteredTracks);

			const filteredAlbums = allAlbums.filter((album) =>
				album.title.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredAlbums(filteredAlbums);
		} else {
			setFilteredArtists(allArtists);
			setFilteredTracks(allTracks);
			setFilteredAlbums(allAlbums);
		}
	};

	const renderItem = ({ item }) => {
		if (item.type === "artist") {
			return (
				<ArtistRow
					artist={item}
					navigation={navigation}
					accessibilityRole="button"
					accessibilityLabel={`Artist: ${item.name}`}
				/>
			);
		} else if (item.type === "track") {
			return (
				<TrackRow
					track={item}
					navigation={navigation}
					accessibilityRole="button"
					accessibilityLabel={`Track: ${item.title}`}
				/>
			);
		} else if (item.type === "album") {
			return (
				<AlbumRow
					album={item}
					navigation={navigation}
					accessibilityRole="button"
					accessibilityLabel={`Album: ${item.title}`}
				/>
			);
		}
		return null;
	};

	const combinedData = [
		...filteredArtists.map((artist) => ({ ...artist, type: "artist" })),
		...filteredTracks.map((track) => ({ ...track, type: "track" })),
		...filteredAlbums.map((album) => ({ ...album, type: "album" })),
	];

	return (
		<KeyboardAvoidingView
			style={container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			accessibilityRole="header"
		>
			<TextInput
				style={input}
				value={query}
				onChangeText={handleSearch}
				placeholder={t("searchPlaceholder")}
				placeholderTextColor={placeholder}
				accessibilityLabel={t("searchPlaceholder")}
				accessibilityHint={t("searchHint")}
			/>
			<View style={container}>
				{loading ? (
					<LoadingIndicator />
				) : (
					<FlatList
						data={combinedData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderItem}
						contentContainerStyle={scrollView}
						ListEmptyComponent={
							<Text
								style={emptyResult}
								accessibilityRole="alert"
								accessibilityLabel={t("noResults")}
							>
								{t("noResults")}
							</Text>
						}
						accessibilityRole="list"
						accessibilityLabel={t("searchResults")}
					/>
				)}
			</View>
		</KeyboardAvoidingView>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			color: theme.primaryText,
			borderColor: theme.border,
			backgroundColor: theme.background,
		},
		input: {
			height: 40,
			borderWidth: 1,
			borderRadius: 25,
			paddingHorizontal: 10,
			marginHorizontal: 15,
			marginVertical: 10,
			color: theme.primaryText,
			borderColor: theme.border,
			backgroundColor: theme.background,
		},
		scrollView: {
			flexGrow: 1,
		},
		emptyResult: {
			textAlign: "center",
			fontStyle: "italic",
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
		},
		placeholder: {
			color: theme.secondaryText,
		},
	});

export default SearchScreen;
