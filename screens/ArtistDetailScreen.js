import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ArtistDetailScreen = ({ route }) => {
    const { artist } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: artist.image }} style={styles.image} />
            <Text style={styles.name}>{artist.name}</Text>
            <Text style={styles.bio}>{artist.bio}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ArtistDetailScreen;