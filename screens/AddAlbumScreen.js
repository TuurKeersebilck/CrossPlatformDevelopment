import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import { getArtists, addAlbum } from "../api/api_calls";
import ModalPicker from "../components/ModalPicker";

const AddAlbumScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
    const [title, setTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isArtistModalVisible, setIsArtistModalVisible] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistsData = await getArtists();
                setArtists(artistsData);
            } catch (error) {
                console.error("Error fetching artists:", error);
            }
        };

        fetchArtists();
    }, []);

    const handleAddAlbum = async () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title is required";
        if (!imgUrl) newErrors.imgUrl = "Image URL is required";
        if (!releaseDate) newErrors.releaseDate = "Release date is required";
        if (!selectedArtist) newErrors.selectedArtist = "Artist is required";

        if (releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
            newErrors.releaseDate = "Release date must be in YYYY-MM-DD format";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const album = { title, imgUrl, releaseDate, artistId: selectedArtist };
            const response = await addAlbum(album);
            if (response.error) throw new Error(response.error);
            navigation.goBack();
            Alert.alert("Album Added", `The album "${title}" has been added successfully.`);
        } catch (error) {
            console.error("Error adding album:", error.message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.primaryText }]}>Title:*</Text>
            {errors.title && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.title}</Text>}
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                placeholderTextColor={colors.secondaryText}
            />

            <Text style={[styles.label, { color: colors.primaryText }]}>Image URL:*</Text>
            {errors.imgUrl && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.imgUrl}</Text>}
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={imgUrl}
                onChangeText={setImgUrl}
                placeholder="Enter image URL"
                placeholderTextColor={colors.secondaryText}
            />

            <Text style={[styles.label, { color: colors.primaryText }]}>Release Date:*</Text>
            {errors.releaseDate && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.releaseDate}</Text>}
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={releaseDate}
                onChangeText={setReleaseDate}
                placeholder="Enter release date (YYYY-MM-DD)"
                placeholderTextColor={colors.secondaryText}
            />

            <Text style={[styles.label, { color: colors.primaryText }]}>Select Artist:*</Text>
            {errors.selectedArtist && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.selectedArtist}</Text>}
            <TouchableOpacity
                style={[styles.pickerButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                onPress={() => setIsArtistModalVisible(true)}
            >
                <Text style={{ color: colors.primaryText }}>
                    {selectedArtist ? artists.find((a) => a.id === selectedArtist)?.name : "Select an artist"}
                </Text>
            </TouchableOpacity>

            <ModalPicker
                visible={isArtistModalVisible}
                onClose={() => setIsArtistModalVisible(false)}
                items={artists}
                onSelect={setSelectedArtist}
                title="Select Artist"
                colors={colors}
            />

            <Button title="Add Album" onPress={handleAddAlbum} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    pickerButton: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 14,
        marginBottom: 10,
    },
});

export default AddAlbumScreen;