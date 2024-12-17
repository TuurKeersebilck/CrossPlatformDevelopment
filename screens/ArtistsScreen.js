import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";
import { Colors } from "../styling/Colors";

const ArtistsScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;

    useEffect(() => {
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
        fetchArtists();
    }, []);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (artists.length === 0) {
		return (
			<View
				style={[styles.centered, { backgroundColor: colors.background }]}
				accessibilityRole="alert"
				accessibilityLabel="List of artists is empty"
			>
				<Text style={{ color: colors.primaryText }}>No artists available</Text>
			</View>
		);
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<FlatList
				data={artists}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ArtistRow
						artist={item}
						navigation={navigation}
						accessibilityRole="button"
						accessibilityLabel={`Artist: ${item.name}`}
					/>
				)}
				contentContainerStyle={styles.scrollView}
				accessibilityRole="list"
				accessibilityLabel="List of artists"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ArtistsScreen;
