import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import artistModel from "../../models/artistModel";

const ArtistRow = ({ artist, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("ArtistDetail", { artist })}
		>
			<View style={styles.artist}>
				<Image source={{ uri: artist.img_url }} style={styles.artistImage} />
				<View style={styles.artistInfo}>
					<Text style={styles.artistName}>{artist.name}</Text>
					<Text style={styles.artistBio}>{artist.bio}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

ArtistRow.propTypes = {
	artist: PropTypes.instanceOf(artistModel).isRequired,
	navigation: PropTypes.object.isRequired,
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
