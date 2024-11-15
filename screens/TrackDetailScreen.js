import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TrackDetailScreen = ({ route }) => {
	const { track } = route.params;

	return (
		<View style={styles.container}>
			<Image source={{ uri: track.image }} style={styles.trackImage} />
			<Text style={styles.trackTitle}>{track.title}</Text>
			<Text style={styles.trackArtist}>{track.artist}</Text>
			<Text style={styles.trackDuration}>{track.duration}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	trackImage: {
		width: 200,
		height: 200,
		marginBottom: 20,
	},
	trackTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	trackArtist: {
		fontSize: 18,
		color: "#666",
	},
	trackDuration: {
		fontSize: 16,
		color: "#999",
	},
});

export default TrackDetailScreen;
