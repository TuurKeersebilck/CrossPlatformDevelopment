import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { toggleAlbumFavorite } from "../../api/api_calls";

const AlbumHeader = ({ section, isDarkMode }) => {
    const [isFavorited, setIsFavorited] = useState(section.favorite);
    const [error, setError] = useState(null);

    const toggleFavorite = async () => {
        try {
            const response = await toggleAlbumFavorite(section.albumId, !isFavorited);
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
        <View style={[styles.sectionHeader, isDarkMode && styles.sectionHeaderDark]}>
            <Image source={{ uri: section.imgUrl }} style={styles.albumImage} />
            <Text style={[styles.sectionHeaderText, isDarkMode && styles.sectionHeaderTextDark]}>
                {section.title}
            </Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Ionicons
                    name={isFavorited ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavorited ? "red" : "gray"}
                />
            </TouchableOpacity>
            {error && (
                <Text style={[styles.errorText, isDarkMode && styles.errorTextDark]}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: "#f4f4f4",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    sectionHeaderDark: {
        backgroundColor: "#333",
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginLeft: 10,
        flex: 1,
    },
    sectionHeaderTextDark: {
        color: "white",
    },
    albumImage: {
        width: 50,
        height: 50,
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

export default AlbumHeader;