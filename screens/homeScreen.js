import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TrackRow from "../components/tracklist/trackRow";
import trackMockData from "../assets/trackmockup";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Track List</Text>
			<ScrollView contentContainerStyle={styles.scrollView}>
				{trackMockData.map((track, index) => (
					<TrackRow key={index} track={track} />
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	scrollView: {
		flexGrow: 1,
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
		paddingTop: 25,
	},
});

export default HomeScreen;
