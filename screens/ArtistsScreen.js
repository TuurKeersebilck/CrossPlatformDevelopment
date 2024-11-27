import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import ArtistRow from "../components/artistList/artistRow";
import { getArtists } from "../api/api_calls";

const HomeScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);

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
		<ScrollView contentContainerStyle={styles.scrollView}>
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
});

export default HomeScreen;
