import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={query}
                onChangeText={handleSearch}
                placeholder="Search artists and tracks"
                placeholderTextColor={colors.secondaryText}
            />
            <ScrollView>
                {filteredArtists.map((artist) => (
                    <ArtistRow key={artist.id} artist={artist} navigation={navigation} />
                ))}
                {filteredTracks.map((track) => (
                    <TrackRow key={track.id} track={track} navigation={navigation} />
                ))}
                {filteredArtists.length === 0 && filteredTracks.length === 0 && (
                    <Text style={{ color: colors.primaryText, textAlign: "center", marginTop: 20 }}>
                        No results found
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default SearchScreen;