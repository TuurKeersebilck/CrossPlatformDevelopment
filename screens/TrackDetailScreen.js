import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { fetchTrackDetails } from "../api/api_calls";

const TrackDetailScreen = ({ route, navigation }) => {
    const { trackId } = route.params;
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
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {track && (
                <>
                    <Image source={{ uri: track.imgUrl }} style={styles.trackImage} />
                    <Text style={styles.trackTitle}>{track.title}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ArtistDetail", { artistId: track.artistId, name: track.artistName })}
                    >
                        <Text style={styles.trackArtist}>{track.artistName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.trackDuration}>{track.duration}</Text>
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
        color: "blue", // Make the artist name look clickable
    },
    trackDuration: {
        fontSize: 16,
        color: "#888",
    },
    errorText: {
        color: "red",
        fontSize: 18,
    },
});

export default TrackDetailScreen;