import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";
import { Themes } from "../styling/Themes";
import { useFocusEffect } from "@react-navigation/native";

const ArtistsScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const { container, scrollView, centered, empty } = createStyles(theme);

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
				style={centered}
				accessibilityRole="alert"
				accessibilityLabel="List of artists is empty"
			>
				<Text style={empty}>No artists available</Text>
			</View>
		);
	}

	return (
		<View style={container}>
			<Button
				title="Add Artist"
				onPress={() => navigation.navigate("AddArtistScreen")}
				accessibilityRole="button"
				accessibilityLabel="Add artist"
			/>
			<FlatList
				data={artists}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ArtistRow
						artist={item}
						navigation={navigation}
						accessibilityRole="button"
						accessibilityLabel={`Artist: ${item.name}`}
						onPress={() =>
							navigation.navigate("ArtistDetailScreen", { artistId: item.id })
						}
					/>
				)}
				contentContainerStyle={scrollView}
				accessibilityRole="list"
				accessibilityLabel="List of artists"
			/>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
		},
		scrollView: {
			marginVertical: 10,
			paddingHorizontal: 10,
		},
		centered: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.background,
		},
		empty: {
			textAlign: "center",
			fontStyle: "italic",
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
		},
	});

export default ArtistsScreen;
