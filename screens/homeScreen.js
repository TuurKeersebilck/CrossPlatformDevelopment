import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import TrackRow from "../components/tracklist/trackRow";
import trackMockData from "../assets/trackmockup";

const HomeScreen = () => {
	var tracks = trackMockData;

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			{tracks.map((track, index) => (
				<TrackRow key={index} track={track} />
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
