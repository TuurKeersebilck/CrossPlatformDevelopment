import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ArtistRow = ({ artist, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("ArtistDetail", { artist })}
		>
			<View style={styles.artist}>
				<Image source={{ uri: artist.imgUrl }} style={styles.artistImage} />
				<View style={styles.artistInfo}>
					<Text style={styles.artistName}>{artist.name}</Text>
					<Text style={styles.artistBio}>{artist.bio}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	artist: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	artistImage: {
		width: 50,
		height: 50,
	},
	artistInfo: {
		marginLeft: 10,
		flex: 1,
	},
	artistName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	artistBio: {
		fontSize: 14,
		color: "gray",
	},
});

export default ArtistRow;
