import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import {
    getArtists,
    fetchArtistAlbums,
    addArtist,
    addAlbum,
    addTrack,
} from "../api/api_calls";
import ModalPicker from "../components/ModalPicker";

const AddItemScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [bio, setBio] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [duration, setDuration] = useState("");
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isArtistModalVisible, setIsArtistModalVisible] = useState(false);
    const [isAlbumModalVisible, setIsAlbumModalVisible] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artistsData = await getArtists();
                setArtists(artistsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchArtists();
    }, []);

    useEffect(() => {
        const fetchAlbums = async () => {
            if (selectedArtist) {
                try {
                    const albumsData = await fetchArtistAlbums(selectedArtist);
                    setAlbums(albumsData);
                } catch (error) {
                    console.error("Error fetching albums:", error);
                }
            } else {
                setAlbums([]);
            }
        };

        fetchAlbums();
    }, [selectedArtist]);

    const handleTypeChange = (newType) => {
        setType(newType);
        setName("");
        setImgUrl("");
        setBio("");
        setReleaseDate("");
        setDuration("");
        setSelectedArtist(null);
        setSelectedAlbum(null);
        setAlbums([]);
        setErrors({});
    };

    const handleAdd = async () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!imgUrl) newErrors.imgUrl = "Image URL is required";
        if (type === "artist" && !bio) newErrors.bio = "Bio is required";
        if (type !== "artist" && !selectedArtist) newErrors.selectedArtist = "Artist is required";
        if (type === "album" && !releaseDate) newErrors.releaseDate = "Release date is required";
        if (type === "track" && !duration) newErrors.duration = "Duration is required";

        if (type === "album" && releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
            newErrors.releaseDate = "Release date must be in YYYY-MM-DD format";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            let response;
            if (type === "artist") {
                const artist = { name, imgUrl, bio };
                console.log("Adding artist:", artist);
                response = await addArtist(artist);
            } else if (type === "album") {
                const album = {
                    title: name,
                    imgUrl,
                    releaseDate,
                    artistId: selectedArtist,
                };
                console.log("Adding album:", album);
                response = await addAlbum(album);
            } else if (type === "track") {
                const track = {
                    title: name,
                    imgUrl,
                    duration,
                    artistId: selectedArtist,
                    albumId: selectedAlbum,
                };
                console.log("Adding track:", track);
                response = await addTrack(track);
            }
            if (response.error) throw new Error(response.error);
            navigation.goBack();
        } catch (error) {
            console.error("Error adding item:", error.message);
        }
    };

    const renderArtistSelect = () => {
        const selectedArtistName = selectedArtist
            ? artists.find((a) => a.id === selectedArtist)?.name
            : "Select an artist";

        return (
            <View>
                <Text style={[styles.label, { color: colors.primaryText }]}>
                    Select Artist:*
                </Text>
                {errors.selectedArtist && (
                    <Text style={[styles.errorText, { color: colors.errorText }]}>
                        {errors.selectedArtist}
                    </Text>
                )}
                <TouchableOpacity
                    style={[
                        styles.pickerButton,
                        {
                            backgroundColor: colors.backgroundColor,
                            borderColor: colors.border,
                        },
                    ]}
                    onPress={() => setIsArtistModalVisible(true)}
                >
                    <Text style={{ color: colors.primaryText }}>
                        {selectedArtistName}
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
            </View>
        );
    };

    const renderAlbumSelect = () => {
        const selectedAlbumName = selectedAlbum
            ? albums.find((a) => a.id === selectedAlbum)?.title
            : "Select an album (optional)";

        return (
            <View>
                <Text style={[styles.label, { color: colors.primaryText }]}>
                    Select Album (optional):
                </Text>
                <TouchableOpacity
                    style={[
                        styles.pickerButton,
                        {
                            backgroundColor: colors.backgroundColor,
                            borderColor: colors.border,
                        },
                    ]}
                    onPress={() => setIsAlbumModalVisible(true)}
                >
                    <Text style={{ color: colors.primaryText }}>{selectedAlbumName}</Text>
                </TouchableOpacity>

                <ModalPicker
                    visible={isAlbumModalVisible}
                    onClose={() => setIsAlbumModalVisible(false)}
                    items={albums}
                    onSelect={setSelectedAlbum}
                    title="Select Album"
                    colors={colors}
                />
            </View>
        );
    };

    const handleNumericInput = (value, setter) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setter(numericValue);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
                    <Text style={[styles.label, { color: colors.primaryText }]}>
                        Select Type:
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Artist" onPress={() => handleTypeChange("artist")} />
                        <Button title="Album" onPress={() => handleTypeChange("album")} />
                        <Button title="Track" onPress={() => handleTypeChange("track")} />
                    </View>

                    {type !== "" && (
                        <>
                            <Text style={[styles.label, { color: colors.primaryText }]}>
                                Name:*
                            </Text>
                            {errors.name && (
                                <Text style={[styles.errorText, { color: colors.errorText }]}>
                                    {errors.name}
                                </Text>
                            )}
                            <TextInput
                                style={[
                                    styles.input,
                                    { color: colors.primaryText, borderColor: colors.border },
                                ]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter name"
                                placeholderTextColor={colors.secondaryText}
                            />

                            <Text style={[styles.label, { color: colors.primaryText }]}>
                                Image URL:*
                            </Text>
                            {errors.imgUrl && (
                                <Text style={[styles.errorText, { color: colors.errorText }]}>
                                    {errors.imgUrl}
                                </Text>
                            )}
                            <TextInput
                                style={[
                                    styles.input,
                                    { color: colors.primaryText, borderColor: colors.border },
                                ]}
                                value={imgUrl}
                                onChangeText={setImgUrl}
                                placeholder="Enter image URL"
                                placeholderTextColor={colors.secondaryText}
                            />

                            {type === "artist" && (
                                <>
                                    <Text style={[styles.label, { color: colors.primaryText }]}>
                                        Bio:
                                    </Text>
                                    {errors.bio && (
                                        <Text style={[styles.errorText, { color: colors.errorText }]}>
                                            {errors.bio}
                                        </Text>
                                    )}
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.primaryText, borderColor: colors.border },
                                        ]}
                                        value={bio}
                                        onChangeText={setBio}
                                        placeholder="Enter bio"
                                        placeholderTextColor={colors.secondaryText}
                                    />
                                </>
                            )}

                            {(type === "album" || type === "track") && renderArtistSelect()}

                            {type === "album" && (
                                <>
                                    <Text style={[styles.label, { color: colors.primaryText }]}>
                                        Release Date:*
                                    </Text>
                                    {errors.releaseDate && (
                                        <Text style={[styles.errorText, { color: colors.errorText }]}>
                                            {errors.releaseDate}
                                        </Text>
                                    )}
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.primaryText, borderColor: colors.border },
                                        ]}
                                        value={releaseDate}
                                        onChangeText={setReleaseDate}
                                        placeholder="Enter release date (YYYY-MM-DD)"
                                        placeholderTextColor={colors.secondaryText}
                                    />
                                </>
                            )}

                            {type === "track" && (
                                <>
                                    {renderAlbumSelect()}

                                    <Text style={[styles.label, { color: colors.primaryText }]}>
                                        Duration:*
                                    </Text>
                                    {errors.duration && (
                                        <Text style={[styles.errorText, { color: colors.errorText }]}>
                                            {errors.duration}
                                        </Text>
                                    )}
                                    <TextInput
                                        style={[
                                            styles.input,
                                            { color: colors.primaryText, borderColor: colors.border },
                                        ]}
                                        value={duration}
                                        onChangeText={setDuration}
                                        placeholder="Enter duration (e.g., 03:45)"
                                        placeholderTextColor={colors.secondaryText}
                                    />
                                </>
                            )}

                            <Button title="Add" onPress={handleAdd} />
                        </>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
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

export default AddItemScreen;