import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { fetchTrackDetails } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";

const TrackDetailScreen = ({ route, navigation }) => {
    const { trackId } = route.params;
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primaryText} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.errorText }]}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {track && (
                <>
                    <Image source={{ uri: track.imgUrl }} style={styles.trackImage} />
                    <Text style={[styles.trackTitle, { color: colors.primaryText }]}>{track.title}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ArtistDetail", { artistId: track.artistId, name: track.artistName })}
                    >
                        <Text style={[styles.trackArtist, { color: colors.linkText }]}>{track.artistName}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.trackDuration, { color: colors.secondaryText }]}>{track.duration}</Text>
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
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    trackArtist: {
        fontSize: 18,
        marginBottom: 10,
    },
    trackDuration: {
        fontSize: 16,
    },
    errorText: {
        fontSize: 18,
    },
});

export default TrackDetailScreen;