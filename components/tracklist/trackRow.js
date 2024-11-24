import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import trackModel from "../../models/trackModel";

const TrackRow = ({ track, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("TrackDetail", { track })}
        >
            <View style={styles.track}>
                <Image source={{ uri: track.img_url }} style={styles.trackImage} />
                <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                    <Text style={styles.trackDuration}>{track.duration} seconds</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

TrackRow.propTypes = {
    track: PropTypes.instanceOf(trackModel).isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    track: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
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
        fontWeight: "bold",
    },
    trackDuration: {
        fontSize: 14,
        color: "gray",
    },
});

export default TrackRow;