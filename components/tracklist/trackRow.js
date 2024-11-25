import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import trackModel from "../../models/trackModel";
import albumMockData from "../../assets/mockupData/albumMockup";
import artistMockup from "../../assets/mockupData/artistMockup";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";

const TrackRow = ({ track, navigation }) => {
	const album = albumMockData.find((album) => album._id === track.albumId);
	const artist = artistMockup.find(
		(artist) => artist._id === track.artistId[0]
	);
	const [isFavorited, setIsFavorited] = useState(false);
	const { isDarkMode } = useTheme();

	const toggleFavorite = () => {
		setIsFavorited(!isFavorited);
	};

	const screenWidth = Dimensions.get("window").width;
	const isMobile = screenWidth < 600;

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("TrackDetail", { track })}
		>
			<View style={[styles.track, isDarkMode && styles.trackDark]}>
				<Image source={track.img_url} style={styles.trackImage} />
				<View style={styles.trackInfo}>
					<Text
						style={[styles.trackTitle, isDarkMode && styles.trackTitleDark]}
					>
						{track.title}
					</Text>
					<Text
						style={[styles.trackArtist, isDarkMode && styles.trackArtistDark]}
					>
						{artist.name}
					</Text>
				</View>
				<View style={styles.trackAlbum}>
					<Text
						style={[styles.albumTitle, isDarkMode && styles.albumTitleDark]}
					>
						{album.title}
					</Text>
				</View>
				{!isMobile && (
					<View style={styles.trackDurationContainer}>
						<Text
							style={[
								styles.trackDuration,
								isDarkMode && styles.trackDurationDark,
							]}
						>
							{track.duration}
						</Text>
					</View>
				)}
				<TouchableOpacity
					onPress={toggleFavorite}
					style={styles.favoriteButton}
				>
					<Ionicons
						name={isFavorited ? "heart" : "heart-outline"}
						size={24}
						color={isFavorited ? "red" : "gray"}
					/>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

TrackRow.propTypes = {
	track: PropTypes.instanceOf(trackModel).isRequired,
	navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	track: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		backgroundColor: "white",
	},
	trackDark: {
		backgroundColor: "#333",
		borderBottomColor: "#555",
	},
	trackImage: {
		width: 50,
		height: 50,
		borderRadius: 5,
	},
	trackInfo: {
		marginLeft: 10,
		flex: 2,
	},
	trackTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	trackTitleDark: {
		color: "white",
	},
	trackArtist: {
		fontSize: 14,
		color: "gray",
	},
	trackArtistDark: {
		color: "#ccc",
	},
	trackAlbum: {
		flex: 1,
		alignItems: "center",
	},
	albumTitle: {
		fontSize: 14,
		color: "gray",
	},
	albumTitleDark: {
		color: "#ccc",
	},
	trackDurationContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	trackDuration: {
		fontSize: 14,
		color: "gray",
	},
	trackDurationDark: {
		color: "#ccc",
	},
	favoriteButton: {
		marginLeft: 10,
	},
});

export default TrackRow;
