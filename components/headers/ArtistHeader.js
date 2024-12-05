import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleArtistFavorite } from "../../api/api_calls";

const ArtistHeader = ({ artist, isDarkMode }) => {
    const [isFavorited, setIsFavorited] = useState(artist.favorite);
    const [error, setError] = useState(null);

    const toggleFavorite = async () => {
        try {
            const response = await toggleArtistFavorite(artist.id, !isFavorited);
            if (response.success) {
                setIsFavorited(response.isFavorited);
            } else {
                setError("Failed to update favorite status. Please try again.");
            }
        } catch (error) {
            setError("Failed to update favorite status. Please try again.");
        }
    };

    return (
        <View style={styles.header}>
            {artist && (
                <>
                    <Image source={{ uri: artist.imgUrl }} style={styles.image} />
                    <Text style={[styles.name, isDarkMode && styles.nameDark]}>
                        {artist.name}
                    </Text>
                    <Text style={[styles.bio, isDarkMode && styles.bioDark]}>
                        {artist.bio}
                    </Text>
                    <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                        <Ionicons
                            name={isFavorited ? "heart" : "heart-outline"}
                            size={30}
                            color={isFavorited ? "red" : "gray"}
                        />
                    </TouchableOpacity>
                    {error && (
                        <Text style={[styles.errorText, isDarkMode && styles.errorTextDark]}>
                            {error}
                        </Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "black",
    },
    nameDark: {
        color: "white",
    },
    bio: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "black",
    },
    bioDark: {
        color: "white",
    },
    favoriteButton: {
        marginBottom: 20,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 10,
    },
    errorTextDark: {
        color: "lightcoral",
    },
});

export default ArtistHeader;