import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";

const HomeScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);
	const { isDarkMode } = useTheme();
	useEffect(() => {
		const fetchArtists = () => {
			getArtists()
				.then((artistsData) => {
					setArtists(artistsData);
				})
				.catch((error) => {
					console.error("Error fetching artists:", error);
				});
		};

		fetchArtists();
	}, []);

	return (
        <ScrollView contentContainerStyle={[styles.scrollView, isDarkMode && styles.scrollViewDark]}>
			{artists.map((artist, index) => (
				<ArtistRow key={index} artist={artist} navigation={navigation} />
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
		padding: 10,
	},
	scrollViewDark: {
        backgroundColor: "black",
    },
});

export default HomeScreen;
