import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import TrackRow from "../components/rows/TrackRow";
import ArtistHeader from "../components/headers/ArtistHeader";
import AlbumHeader from "../components/headers/AlbumHeader";
import { fetchArtistAlbums, fetchArtistDetails } from "../api/api_calls";
import { Colors } from "../styling/Colors";

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artistId } = route.params;
    const { isDarkMode } = useTheme();
    const [artist, setArtist] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const colors = isDarkMode ? Colors.dark : Colors.light;

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const [artistDetails, albums] = await Promise.all([
                    fetchArtistDetails(artistId),
                    fetchArtistAlbums(artistId),
                ]);

                if (artistDetails.error || albums.error) {
                    throw new Error(artistDetails.error || albums.error);
                }

                setArtist(artistDetails);
                setSections(
                    albums.map((album) => ({
                        title: album.title,
                        imgUrl: album.imgUrl,
                        data: album.tracks,
                        albumId: album.id,
                        favorite: album.favorite,
                    }))
                );
            } catch (error) {
                setError("Failed to load artist data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primaryText} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {error && (
                <Text style={[styles.errorText, { color: colors.errorText }]}>
                    {error}
                </Text>
            )}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section }) => (
                    <AlbumHeader section={section} isDarkMode={isDarkMode} />
                )}
                renderItem={({ item }) => (
                    <TrackRow track={item} navigation={navigation} />
                )}
                ListHeaderComponent={() => (
                    <ArtistHeader artist={artist} isDarkMode={isDarkMode} />
                )}
                contentContainerStyle={[
                    styles.sectionList,
                    { backgroundColor: colors.background },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    sectionList: {
        paddingBottom: 20,
    },
});

export default ArtistDetailScreen;