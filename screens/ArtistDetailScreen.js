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
import {
    fetchArtistAlbums,
    fetchArtistDetails,
} from "../api/api_calls";

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artistId } = route.params;
    const { isDarkMode } = useTheme();
    const [artist, setArtist] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setSections(albums.map(album => ({
                    title: album.title,
                    imgUrl: album.imgUrl,
                    data: album.tracks,
                    albumId: album.id,
                    favorite: album.favorite,
                })));
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
            <View style={[styles.container, isDarkMode && styles.containerDark]}>
                <ActivityIndicator size="large" color={isDarkMode ? "white" : "black"} />
            </View>
        );
    }

    return (
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
            {error && (
                <Text style={[styles.errorText, isDarkMode && styles.errorTextDark]}>
                    {error}
                </Text>
            )}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section }) => (
                    <AlbumHeader
                        section={section}
                        isDarkMode={isDarkMode}
                    />
                )}
                renderItem={({ item }) => (
                    <TrackRow track={item} navigation={navigation} />
                )}
                ListHeaderComponent={() => (
                    <ArtistHeader
                        artist={artist}
                        isDarkMode={isDarkMode}
                    />
                )}
                contentContainerStyle={[styles.sectionList, isDarkMode && styles.sectionListDark]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    containerDark: {
        backgroundColor: "black",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    errorTextDark: {
        color: "lightcoral",
    },
    sectionList: {
        paddingBottom: 20,
    },
    sectionListDark: {
        backgroundColor: "black",
    },
});

export default ArtistDetailScreen;