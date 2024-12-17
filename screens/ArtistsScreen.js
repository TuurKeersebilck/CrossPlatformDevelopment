import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
                style={[styles.centered, { backgroundColor: colors.background }]}
                accessibilityRole="alert"
                accessibilityLabel="List of artists is empty"
            >
                <Text style={{ color: colors.primaryText }}>
                    No artists available
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollView,
                    { backgroundColor: colors.background },
                ]}
                accessibilityRole="scrollbar"
                accessibilityLabel="List of artists"
            >
                {artists.map((artist) => (
                    <ArtistRow
                        key={artist.id}
                        artist={artist}
                        navigation={navigation}
                        accessibilityRole="button"
                        accessibilityLabel={`Artist: ${artist.name}`}
                    />
                ))}
            </ScrollView>
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