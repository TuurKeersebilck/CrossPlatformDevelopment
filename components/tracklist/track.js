import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

const Track = ({ title, artist, duration, image }) => {
    return (
        <View style={styles.track}>
            <Image source={{ uri: image }} style={styles.trackImage} />
            <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{title}</Text>
                <Text style={styles.trackArtist}>{artist}</Text>
                <Text style={styles.trackDuration}>{duration}</Text>
            </View>
        </View>
    );
};

Track.propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    track: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    trackImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    trackInfo: {
        marginLeft: 10,
        flex: 1,
    },
    trackTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    trackArtist: {
        fontSize: 14,
        color: '#666',
    },
    trackDuration: {
        fontSize: 12,
        color: '#999',
    },
});

export default Track;