import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchTrackDetails } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import LoadingIndicator from "../components/Loading";

const TrackDetailScreen = ({ route, navigation }) => {
	const { trackId } = route.params;
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const [track, setTrack] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// TODO: alle styling destructureren
	// TODO: settings beter stylen
	useEffect(() => {
		const getTrackDetails = async () => {
			try {
				const trackData = await fetchTrackDetails(trackId);
				setTrack(trackData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getTrackDetails();
	}, [trackId]);

	const {
		container,
		trackImage,
		trackTitle,
		trackArtist,
		trackDuration,
		errorText,
	} = styles;

	if (loading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return (
			<View style={[container, { backgroundColor: theme.background }]}>
				<Text
					style={[
						errorText,
						{ color: theme.errorText, fontSize: theme.fontSizes.medium },
					]}
				>
					Error: {error}
				</Text>
			</View>
		);
	}

	return (
		<View style={[container, { backgroundColor: theme.background }]}>
			{track && (
				<>
					<Image
						source={{ uri: track.imgUrl }}
						style={trackImage}
						accessibilityRole="image"
						accessibilityLabel={`Image of track ${track.title}`}
					/>
					<Text
						style={[
							trackTitle,
							{
								color: theme.primaryText,
								fontSize: theme.fontSizes.xlarge,
								fontWeight: theme.fontWeights.bold,
							},
						]}
						accessibilityRole="header"
						accessibilityLabel={`Track title: ${track.title}`}
					>
						{track.title}
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("ArtistDetail", {
								artistId: track.artistId,
								name: track.artistName,
							})
						}
						accessibilityRole="button"
						accessibilityLabel={`View details for artist ${track.artistName}`}
					>
						<Text
							style={[
								trackArtist,
								{ color: theme.linkText, fontSize: theme.fontSizes.large },
							]}
						>
							{track.artistName}
						</Text>
					</TouchableOpacity>
					<Text
						style={[
							trackDuration,
							{ color: theme.secondaryText, fontSize: theme.fontSizes.medium },
						]}
						accessibilityLabel={`Track duration: ${track.duration}`}
					>
						{track.duration}
					</Text>
				</>
			)}
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
		marginBottom: 10,
	},
	trackArtist: {
		marginBottom: 10,
	},
});

export default TrackDetailScreen;
