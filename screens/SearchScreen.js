import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import TrackRow from "../components/rows/TrackRow";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists, getTracks } from "../api/api_calls";
import { Themes } from "../styling/Themes";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [allTracks, setAllTracks] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Themes.dark : Themes.light;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artistsData, tracksData] = await Promise.all([
                    getArtists(),
                    getTracks(),
                ]);

                setQuery("");
                setAllArtists(artistsData);
                setFilteredArtists(artistsData);
                setAllTracks(tracksData);
                setFilteredTracks(tracksData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filteredArtists = allArtists.filter((artist) =>
                artist.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredArtists(filteredArtists);

            const filteredTracks = allTracks.filter((track) =>
                track.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredTracks(filteredTracks);
        } else {
            setFilteredArtists(allArtists);
            setFilteredTracks(allTracks);
        }
    };

    const renderItem = ({ item }) => {
        if (item.type === "artist") {
            return (
                <ArtistRow
                    artist={item}
                    navigation={navigation}
                    accessibilityRole="button"
                    accessibilityLabel={`Artist: ${item.name}`}
                />
            );
        } else if (item.type === "track") {
            return (
                <TrackRow
                    track={item}
                    navigation={navigation}
                    accessibilityRole="button"
                    accessibilityLabel={`Track: ${item.title}`}
                />
            );
        }
        return null;
    };

    const combinedData = [
        ...filteredArtists.map((artist) => ({ ...artist, type: "artist" })),
        ...filteredTracks.map((track) => ({ ...track, type: "track" })),
    ];

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                {
                    color: colors.primaryText,
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                },
            ]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.primaryText,
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                    },
                ]}
                value={query}
                onChangeText={handleSearch}
                placeholder="Search artists and tracks"
                placeholderTextColor={colors.secondaryText}
                accessibilityLabel="Search artists and tracks"
            />
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <FlatList
                        data={combinedData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.scrollView}
                        ListEmptyComponent={
                            <Text
                                style={{
                                    color: colors.primaryText,
                                    textAlign: "center",
                                    marginTop: 20,
                                }}
                                accessibilityRole="alert"
                                accessibilityLabel="No results found"
                            >
                                No results found
                            </Text>
                        }
                        accessibilityRole="list"
                        accessibilityLabel="List of search results"
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    scrollView: {
        flexGrow: 1,
    },
});

export default SearchScreen;