import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrackRow from "../components/tracklist/trackRow";
import trackMockData from "../assets/trackmockup";

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [filteredTracks, setFilteredTracks] = useState(trackMockData);

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filtered = trackMockData.filter((track) =>
                track.title.toLowerCase().includes(text.toLowerCase()) ||
                track.artist.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredTracks(filtered);
        } else {
            setFilteredTracks(trackMockData);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredTracks(trackMockData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>

                <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />

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
                    <Text style={styles.message}>Search for tracks or artists</Text> // leeg
                ) : filteredTracks.length === 0 ? (
                    <Text style={styles.message}>No tracks found for "{query}"</Text> // niet gevonden
                ) : (
                    filteredTracks.map((track, index) => (
                        <TrackRow key={index} track={track} navigation={navigation} />
                    ))
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
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
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
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
});

export default SearchScreen;