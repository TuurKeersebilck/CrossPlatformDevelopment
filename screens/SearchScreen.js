import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrackRow from "../components/rows/TrackRow";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists, getTracks } from "../api/api_calls";
import { Colors } from "../styling/Colors";
import { useTheme } from "../context/ThemeContext";

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [allTracks, setAllTracks] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistsData = await getArtists();
                setAllArtists(artistsData);
                setFilteredArtists(artistsData);

                const tracksData = await getTracks();
                setAllTracks(tracksData);
                setFilteredTracks(tracksData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filtered = allTracks.filter((track) =>
                track.title.toLowerCase().includes(text.toLowerCase())
            );
            const filteredArtists = allArtists.filter((artist) =>
                artist.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredArtists(filteredArtists);
            setFilteredTracks(filtered);
        } else {
            setFilteredTracks(allTracks);
            setFilteredArtists(allArtists);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredTracks(allTracks);
        setFilteredArtists(allArtists);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.searchContainer, { borderColor: colors.border, backgroundColor: colors.headerBackground }]}>
                <Ionicons
                    name="search"
                    size={20}
                    color={colors.secondaryText}
                    style={styles.searchIcon}
                />

                <TextInput
                    style={[styles.searchBar, { color: colors.primaryText }]}
                    placeholder="Search by track name or artist"
                    placeholderTextColor={colors.secondaryText}
                    value={query}
                    onChangeText={handleSearch}
                />

                {query.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <Ionicons 
                            name="close-circle" 
                            size={20} 
                            color={colors.secondaryText} 
                        />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {query === "" ? (
                    <Text style={[styles.message, { color: colors.secondaryText }]}>
                        Search for tracks or artists
                    </Text>
                ) : filteredTracks.length === 0 && filteredArtists.length === 0 ? (
                    <Text style={[styles.message, { color: colors.secondaryText }]}>
                        No results found for "{query}"
                    </Text>
                ) : (
                    <>
                        {filteredArtists.map((artist) => (
                            <ArtistRow 
                                key={artist.id} 
                                artist={artist} 
                                navigation={navigation} 
                                colorScheme={colors}
                            />
                        ))}
                        {filteredTracks.map((track) => (
                            <TrackRow 
                                key={track.id} 
                                track={track} 
                                navigation={navigation} 
                                colorScheme={colors}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 45,
    },
    clearButton: {
        paddingRight: 10,
    },
    scrollView: {
        flexGrow: 1,
    },
    message: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});

export default SearchScreen;