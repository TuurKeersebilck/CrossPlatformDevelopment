import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import TrackModel from "../../models/trackModel";

const TrackRow = ({ track, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("TrackDetail", { track })}
		>
			<View style={styles.track}>
				<Image source={{ uri: track.image }} style={styles.trackImage} />
				<View style={styles.trackInfo}>
					<Text style={styles.trackTitle}>{track.title}</Text>
					<Text style={styles.trackArtist}>{track.artist}</Text>
					<Text style={styles.trackDuration}>{track.duration}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

TrackRow.propTypes = {
	track: PropTypes.instanceOf(TrackModel).isRequired,
};

const styles = StyleSheet.create({
	track: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	trackImage: {
		width: 50,
		height: 50,
	},
	trackInfo: {
		marginLeft: 10,
		flex: 1,
	},
	trackTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
	},
	trackArtist: {
		fontSize: 14,
		color: "#666",
	},
	trackDuration: {
		fontSize: 12,
		color: "#999",
	},
});

export default TrackRow;
