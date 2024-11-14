import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";

import TrackRow from "../components/tracklist/trackRow";
import trackMockData from "../assets/trackmockup";

const SearchScreen = () => {
	const [query, setQuery] = useState("");
	const [filteredTracks, setFilteredTracks] = useState(trackMockData);

	const handleSearch = (text) => {
		setQuery(text);
		if (text) {
			const filtered = trackMockData.filter(
				(track) =>
					track.title.toLowerCase().includes(text.toLowerCase()) ||
					track.artist.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredTracks(filtered);
		} else {
			setFilteredTracks(trackMockData);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchBar}
					placeholder="Search by track name or artist"
					value={query}
					onChangeText={handleSearch}
				/>
			</View>

			<ScrollView contentContainerStyle={styles.scrollView}>
				{query === "" ? (
					<Text style={{ textAlign: "center" }}>
						Search for tracks or artists
					</Text>
				) : filteredTracks.length === 0 ? (
					<Text style={{ textAlign: "center" }}>
						No tracks found for "{query}"
					</Text>
				) : (
					filteredTracks.map((track, index) => (
						<TrackRow key={index} track={track} />
					))
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	searchBar: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 50,
		paddingLeft: 10,
		marginBottom: 10,
	},
	scrollView: {
		flexGrow: 1,
	},
});

export default SearchScreen;
