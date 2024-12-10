import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleArtistFavorite } from "../../api/api_calls";
import { Colors } from '../../styling/Colors';

const ArtistHeader = ({ artist, isDarkMode }) => {
    const [isFavorited, setIsFavorited] = useState(artist.favorite);
    const [error, setError] = useState(null);
    const colors = isDarkMode ? Colors.dark : Colors.light;

    const toggleFavorite = async () => {
        try {
            const response = await toggleArtistFavorite(artist.id, !isFavorited);
            if (response.success) {
                setIsFavorited(response.isFavorited);
            } else {
                setError("Failed to update favorite status.");
            }
        } catch (error) {
            setError("Failed to update favorite status.");
        }
    };

    return (
        <View style={[styles.header, { backgroundColor: colors.background }]}>
            {artist && (
                <>
                    <Image 
                        source={{ uri: artist.imgUrl }} 
                        style={styles.image} 
                        borderRadius={100}
                    />
                    <Text style={[styles.name, { color: colors.primaryText }]}>
                        {artist.name}
                    </Text>
                    <Text 
                        style={[styles.bio, { color: colors.secondaryText }]}
                    >
                        {artist.bio}
                    </Text>
                    <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                        <Ionicons
                            name={isFavorited ? "heart" : "heart-outline"}
                            size={30}
                            color={colors.accent}
                        />
                    </TouchableOpacity>
                    {error && (
                        <Text style={[styles.errorText, { color: 'red' }]}>
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
        paddingVertical: 20,
        paddingHorizontal: 16,
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
    },
    bio: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    favoriteButton: {
        marginBottom: 10,
    },
    errorText: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
    },
});

export default ArtistHeader;