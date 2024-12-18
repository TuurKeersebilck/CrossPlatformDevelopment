import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import {
    getFavoriteArtists,
    getFavoriteTracks,
    getFavoriteAlbums,
} from "../api/api_calls";
import Icon from "react-native-vector-icons/Ionicons";
import ArtistRow from "../components/rows/ArtistRow";
import TrackRow from "../components/rows/TrackRow";
import AlbumHeader from "../components/headers/AlbumHeader";

const SettingsScreen = ({ navigation }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
// TODO: ADD OPSPLITSEN
// TODO: DARKMODE DUIDELIJKER
    const [favoriteArtists, setFavoriteArtists] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const [favoriteAlbums, setFavoriteAlbums] = useState([]);

    const fetchFavorites = async () => {
        try {
            const [artistsData, tracksData, albumsData] = await Promise.all([
                getFavoriteArtists(),
                getFavoriteTracks(),
                getFavoriteAlbums(),
            ]);
            setFavoriteArtists(artistsData);
            setFavoriteTracks(tracksData);
            setFavoriteAlbums(albumsData);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    const handleSeeAllPress = (title, data, type) => {
        navigation.navigate("AllFavoritesScreen", { title, data, type });
    };

    const renderFavoriteSection = (title, data, type) => (
        <View style={styles.favoriteSection}>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.primaryText }]}>
                    {title}
                </Text>
                {data.length > 5 && (
                    <TouchableOpacity
                        onPress={() => handleSeeAllPress(title, data, type)}
                    >
                        <Text style={[styles.seeAllText, { color: colors.secondaryText }]}>
                            See All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {data.length > 0 ? (
                <FlatList
                    data={data.slice(0, 5)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        if (type === "artist") {
                            return <ArtistRow artist={item} navigation={navigation} />;
                        } else if (type === "track") {
                            return <TrackRow track={item} navigation={navigation} />;
                        } else if (type === "album") {
                            return <AlbumHeader section={item} isDarkMode={isDarkMode} />;
                        }
                        return null;
                    }}
                    scrollEnabled={false}
                    contentContainerStyle={styles.favoriteList}
                />
            ) : (
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                    No {title.toLowerCase()} yet
                </Text>
            )}
        </View>
    );

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <View style={styles.headerContainer}>
                <Text style={[styles.screenTitle, { color: colors.primaryText }]}>
                    Your Library
                </Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={styles.headerIconButton}
                    >
                        <Icon
                            name={isDarkMode ? "sunny" : "moon"}
                            size={25}
                            color={colors.primaryText}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={[
                    { title: "Favorite Artists", data: favoriteArtists, type: "artist" },
                    { title: "Favorite Tracks", data: favoriteTracks, type: "track" },
                    { title: "Favorite Albums", data: favoriteAlbums, type: "album" },
                ]}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) =>
                    renderFavoriteSection(item.title, item.data, item.type)
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIconButton: {
        marginLeft: 15,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "700",
    },
    mainFavoritesList: {
        paddingBottom: 0,
    },
    favoriteSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "600",
    },
    favoriteList: {
        paddingVertical: 10,
    },
    emptyStateText: {
        fontSize: 16,
        textAlign: "center",
        fontStyle: "italic",
    },
});

export default SettingsScreen;