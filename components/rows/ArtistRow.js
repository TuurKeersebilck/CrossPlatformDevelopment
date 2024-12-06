import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Colors } from '../../styling/Colors'; 

const ArtistRow = ({ artist, navigation }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ArtistDetail", {
                    artistId: artist.id,
                    name: artist.name,
                })
            }
            style={styles.container}
        >
            <View style={[styles.artist, { backgroundColor: colors.background }]}>
                <Image 
                    source={{ uri: artist.imgUrl }} 
                    style={styles.artistImage} 
                />
                <View style={styles.artistInfo}>
                    <Text style={[styles.artistName, { color: colors.primaryText }]}>
                        {artist.name}
                    </Text>
                    <Text style={[styles.artistBio, { color: colors.secondaryText }]}>
                        {artist.bio}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 8,
    },
    artist: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
    },
    artistInfo: {
        marginLeft: 12,
        flex: 1,
    },
    artistImage: {
        width: 60,
        height: 60,
		borderRadius: 8,
    },
    artistName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artistBio: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default ArtistRow;