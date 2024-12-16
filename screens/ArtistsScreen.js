import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";

const ArtistsScreen = ({ navigation }) => {
    const [artists, setArtists] = useState([]);
    const { isDarkMode } = useTheme();

    const fetchArtists = async () => {
        try {
            const artistsData = await getArtists();
            setArtists(artistsData);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchArtists();
        }, [])
    );

    return (
        <View style={{backgroundColor: isDarkMode ? "black" : "#F2F2F2" , flex: 1}}>
        <ScrollView contentContainerStyle={[styles.scrollView, isDarkMode && styles.scrollViewDark]}>
            {artists.map((artist) => (
                <ArtistRow key={artist.id} artist={artist} navigation={navigation} />
            ))}
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        padding: 20,
    },
    scrollViewDark: {
        backgroundColor: "#000",
    },
});

export default ArtistsScreen;