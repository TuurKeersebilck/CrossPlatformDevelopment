import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ArtistRow = ({ artist, navigation }) => {
	const { isDarkMode } = useTheme();

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("ArtistDetail", {
					artistId: artist.id,
					name: artist.name,
				})
			}
		>
			<View style={[styles.artist, isDarkMode && styles.artistDark]}>
				<Image source={{ uri: artist.imgUrl }} style={styles.artistImage} />
				<View style={styles.artistInfo}>
					<Text
						style={[styles.artistName, isDarkMode && styles.artistNameDark]}
					>
						{artist.name}
					</Text>
					<Text style={[styles.artistBio, isDarkMode && styles.artistBioDark]}>
						{artist.bio}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	artist: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		backgroundColor: "#f9f9f9",
	},
	artistDark: {
		backgroundColor: "#1e1e1e",
		borderBottomColor: "#444",
	},
	artistInfo: {
		marginLeft: 12,
		flex: 1,
	},
	artistImage: {
		width: 50,
		height: 50,
	},
	artistName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#222",
	},
	artistNameDark: {
		color: "#eee",
	},
	artistBio: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
	artistBioDark: {
		color: "#aaa",
	},
});

export default ArtistRow;
