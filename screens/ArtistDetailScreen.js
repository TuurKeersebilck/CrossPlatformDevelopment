import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SectionList } from "react-native";
import albumMockData from "../assets/mockupData/albumMockup";
import trackMockData from "../assets/mockupData/trackMockup";

const ArtistDetailScreen = ({ route }) => {
    const { artist } = route.params;
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const artistAlbums = albumMockData.filter(
            (album) => album.artistId === artist._id
        );

        const sectionsData = artistAlbums.map((album) => {
            const albumTracks = trackMockData.filter(
                (track) => track.albumId === album._id
            );
            return {
                title: album.title,
                data: albumTracks,
            };
        });

        setSections(sectionsData);
    }, [artist]);

    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={artist.img_url} style={styles.image} />
            <Text style={styles.name}>{artist.name}</Text>
            <Text style={styles.bio}>{artist.bio}</Text>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item._id}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                contentContainerStyle={styles.sectionList}
            />
			
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: "center",
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
    },
    sectionList: {
        paddingBottom: 20,
    },
    sectionHeader: {
        backgroundColor: "#f4f4f4",
        padding: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    itemText: {
        fontSize: 16,
    },
});

export default ArtistDetailScreen;