import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchTrackDetails } from "../../api/api_calls";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import LoadingIndicator from "../../components/Loading";
import { useTranslation } from "react-i18next";

const TrackDetailScreen = ({ route, navigation }) => {
	const { trackId } = route.params;
	const [track, setTrack] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();

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
		errorText,
		trackDuration,
	} = createStyles(theme);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return (
			<View style={container}>
				<Text style={errorText}>Error: {error}</Text>
			</View>
		);
	}

	return (
		<View style={container}>
			{track && (
				<>
					<Image
						source={{ uri: track.imgUrl }}
						style={trackImage}
						accessibilityRole="image"
						accessibilityLabel={t("trackImage", { title: track.title })}
					/>
					<Text
						style={trackTitle}
						accessibilityRole="header"
						accessibilityLabel={t("trackTitle", { title: track.title })}
					>
						{track.title}
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("ArtistDetailScreen", {
								artistId: track.artistId,
								name: track.artistName,
							})
						}
						accessibilityRole="button"
						accessibilityLabel={t("viewArtistDetails", { name: track.artistName })}
					>
						<Text style={trackArtist}>{track.artistName}</Text>
					</TouchableOpacity>
					<Text
						style={trackDuration}
						accessibilityLabel={t("trackDuration", { duration: track.duration })}
					>
						{track.duration}
					</Text>
				</>
			)}
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			padding: 20,
			backgroundColor: theme.background,
		},
		trackImage: {
			width: 200,
			height: 200,
			marginBottom: 20,
		},
		trackTitle: {
			marginBottom: 10,
			color: theme.primaryText,
			fontSize: theme.fontSizes.xlarge,
			fontWeight: theme.fontWeights.bold,
		},
		trackArtist: {
			marginBottom: 10,
			color: theme.linkText,
			fontSize: theme.fontSizes.large,
		},
		trackDuration: {
			marginBottom: 10,
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
	});

export default TrackDetailScreen;
