import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";

const ArtistsScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isDarkMode } = useTheme();

	const fetchArtists = async () => {
		try {
			setLoading(true);
			const artistsData = await getArtists();
			setArtists(artistsData);
		} catch (error) {
			console.error("Error fetching artists:", error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchArtists();
		}, [])
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (artists.length === 0) {
		return (
			<View
				style={[
					styles.centered,
					{ backgroundColor: isDarkMode ? "black" : "#F2F2F2" },
				]}
			>
				<Text style={{ color: isDarkMode ? "white" : "black" }}>
					No artists available
				</Text>
			</View>
		);
	}

	return (
		<View
			style={{ backgroundColor: isDarkMode ? "black" : "#F2F2F2", flex: 1 }}
		>
			<ScrollView
				contentContainerStyle={[
					styles.scrollView,
					isDarkMode && styles.scrollViewDark,
				]}
			>
				{artists.map((artist) => (
					<ArtistRow key={artist.id} artist={artist} navigation={navigation} />
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		padding: 20,
	},
	scrollViewDark: {
		backgroundColor: "#000",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ArtistsScreen;
