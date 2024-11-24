import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import ArtistRow from "../components/artistList/artistRow";
import artistMockData from "../assets/mockupData/artistMockup";

const HomeScreen = ({ navigation }) => {
	var artists = artistMockData;

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
