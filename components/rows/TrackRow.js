import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { toggleTrackFavorite } from "../../api/api_calls";

const TrackRow = ({ track, navigation }) => {
    const [isFavorited, setIsFavorited] = useState(track.favorite);
    const { isDarkMode } = useTheme();

    const toggleFavorite = async () => {
        try {
            const response = await toggleTrackFavorite(track.id, !isFavorited);
            if (response.success) {
                setIsFavorited(response.isFavorited);
            } else {
                console.error("Failed to update favorite status:", response.error);
            }
        } catch (error) {
            console.error("Failed to update favorite status:", error.message);
        }
    };

    const screenWidth = Dimensions.get("window").width;
    const isMobile = screenWidth < 600;

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("TrackDetail", {
                    trackId: track.id,
                    title: track.title,
                })
            }
        >
            <View style={[styles.track, isDarkMode && styles.trackDark]}>
                <Image source={{ uri: track.imgUrl }} style={styles.trackImage} />
                <View style={styles.trackInfo}>
                    <Text style={[styles.trackTitle, isDarkMode && styles.trackTitleDark]}>
                        {track.title}
                    </Text>
                    <Text style={[styles.artistName, isDarkMode && styles.artistNameDark]}>
                        {track.artistName}
                    </Text>
                </View>
                <View style={styles.trackAlbum}>
                    <Text style={[styles.albumTitle, isDarkMode && styles.albumTitleDark]}>
                        {track.albumTitle}
                    </Text>
                </View>
                {!isMobile && (
                    <View style={styles.trackDurationContainer}>
                        <Text style={[styles.trackDuration, isDarkMode && styles.trackDurationDark]}>
                            {track.duration}
                        </Text>
                    </View>
                )}
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                    <Ionicons
                        name={isFavorited ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorited ? "red" : "gray"}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    track: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    trackDark: {
        backgroundColor: "#333",
    },
    trackImage: {
        width: 50,
        height: 50,
    },
    trackInfo: {
        marginLeft: 10,
        flex: 1,
    },
    trackTitle: {
        fontSize: 16,
    },
    trackTitleDark: {
        color: "white",
    },
    artistName: {
        fontSize: 14,
        color: "#888",
    },
    artistNameDark: {
        color: "#ccc",
    },
    trackAlbum: {
        marginLeft: 10,
    },
    albumTitle: {
        fontSize: 14,
        color: "#888",
    },
    albumTitleDark: {
        color: "#ccc",
    },
    trackDurationContainer: {
        marginLeft: 10,
    },
    trackDuration: {
        fontSize: 14,
        color: "#888",
    },
    trackDurationDark: {
        color: "#ccc",
    },
    favoriteButton: {
        marginLeft: 10,
    },
});

export default TrackRow;