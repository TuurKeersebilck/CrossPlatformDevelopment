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
import TrackRow from "../components/tracklist/trackRow";
import ArtistRow from "../components/artistList/artistRow";
import { getArtists, getTracks } from "../api/api_calls";

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [allTracks, setAllTracks] = useState([]);
    const [allArtists, setAllArtists] = useState([]);

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
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="gray"
                    style={styles.searchIcon}
                />

                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by track name or artist"
                    value={query}
                    onChangeText={handleSearch}
                />

                {query.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <Ionicons name="close-circle" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {query === "" ? (
                    <Text style={styles.message}>Search for tracks or artists</Text>
                ) : filteredTracks.length === 0 && filteredArtists.length === 0 ? (
                    <Text style={styles.message}>No results found for "{query}"</Text>
                ) : (
                    <>
                        {filteredArtists.map((artist) => (
                            <ArtistRow key={artist.id} artist={artist} navigation={navigation} />
                        ))}
                        {filteredTracks.map((track) => (
                            <TrackRow key={track.id} track={track} navigation={navigation} />
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
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
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
        color: "gray",
    },
});

export default SearchScreen;