import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import TrackRow from "../components/trackList/trackRow";
import { fetchArtistAlbums } from "../api/api_calls";

const ArtistDetailScreen = ({ route, navigation }) => {
    const { artist } = route.params;
    const { isDarkMode } = useTheme();
    const [sections, setSections] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);

	useEffect(() => {
		const getAlbums = () => {
			fetchArtistAlbums(artist.id)
				.then((sectionsData) => {
					setSections(sectionsData);
				})
				.catch((error) => {
					console.error("Error fetching albums:", error);
				});
		};
	
		getAlbums();
	}, [artist]);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const renderAlbumHeader = ({ section }) => (
        <View
            style={[styles.sectionHeader, isDarkMode && styles.sectionHeaderDark]}
        >
            <Image source={{ uri: section.imgUrl }} style={styles.albumImage} />
            <Text
                style={[
                    styles.sectionHeaderText,
                    isDarkMode && styles.sectionHeaderTextDark,
                ]}
            >
                {section.title}
            </Text>
        </View>
    );

    const renderAlbumTrack = ({ item }) => (
        <TrackRow track={item} navigation={navigation} />
    );

    const renderArtist = () => (
        <View style={styles.header}>
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
        </View>
    );

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item._id}
            renderSectionHeader={renderAlbumHeader}
            renderItem={renderAlbumTrack}
            ListHeaderComponent={renderArtist}
            contentContainerStyle={[
                styles.container,
                isDarkMode && styles.containerDark,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "white",
    },
    containerDark: {
        backgroundColor: "black",
    },
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
    },
    sectionHeaderTextDark: {
        color: "white",
    },
    albumImage: {
        width: 50,
        height: 50,
    },
});

export default ArtistDetailScreen;