import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import TrackRow from "../components/rows/TrackRow";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists, getTracks } from "../api/api_calls";
import { Colors } from "../styling/Colors";
import { useTheme } from "../context/ThemeContext";

const SearchScreen = ({ navigation }) => {
	const [query, setQuery] = useState("");
	const [filteredTracks, setFilteredTracks] = useState([]);
	const [filteredArtists, setFilteredArtists] = useState([]);
	const [allTracks, setAllTracks] = useState([]);
	const [allArtists, setAllArtists] = useState([]);
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [artistsData, tracksData] = await Promise.all([
					getArtists(),
					getTracks(),
				]);

				setQuery("");
				setAllArtists(artistsData);
				setFilteredArtists(artistsData);
				setAllTracks(tracksData);
				setFilteredTracks(tracksData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

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
		} else {
			setFilteredArtists(allArtists);
			setFilteredTracks(allTracks);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<ScrollView
					contentContainerStyle={styles.scrollView}
					accessibilityRole="scrollbar"
					accessibilityLabel="List of search results"
				>
					<TextInput
						style={[
							styles.input,
							{ color: colors.primaryText, borderColor: colors.border },
						]}
						value={query}
						onChangeText={handleSearch}
						placeholder="Search artists and tracks"
						placeholderTextColor={colors.secondaryText}
						accessibilityLabel="Search artists and tracks"
					/>
					{filteredArtists.map((artist) => (
						<ArtistRow
							key={artist.id}
							artist={artist}
							navigation={navigation}
							accessibilityRole="button"
							accessibilityLabel={`Artist: ${artist.name}`}
						/>
					))}
					{filteredTracks.map((track) => (
						<TrackRow
							key={track.id}
							track={track}
							navigation={navigation}
							accessibilityRole="button"
							accessibilityLabel={`Track: ${track.title}`}
						/>
					))}
					{filteredArtists.length === 0 && filteredTracks.length === 0 && (
						<Text
							style={{
								color: colors.primaryText,
								textAlign: "center",
								marginTop: 20,
							}}
							accessibilityRole="alert"
							accessibilityLabel="No results found"
						>
							No results found
						</Text>
					)}
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 20,
	},
	scrollView: {
		flexGrow: 1,
	},
});

export default SearchScreen;
