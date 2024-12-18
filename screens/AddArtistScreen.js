import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import { addArtist } from "../api/api_calls";

const AddArtistScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState({});

    const handleAddArtist = async () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        if (!imgUrl) newErrors.imgUrl = "Image URL is required";
        if (!bio) newErrors.bio = "Bio is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const artist = { name, imgUrl, bio };
            const response = await addArtist(artist);
            if (response.error) throw new Error(response.error);
            navigation.goBack();
            Alert.alert("Artist Added", `The artist "${name}" has been added successfully.`);
        } catch (error) {
            console.error("Error adding artist:", error.message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.primaryText }]}>Name:*</Text>
            {errors.name && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.name}</Text>}
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
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

            <Text style={[styles.label, { color: colors.primaryText }]}>Bio:*</Text>
            {errors.bio && <Text style={[styles.errorText, { color: colors.errorText }]}>{errors.bio}</Text>}
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={bio}
                onChangeText={setBio}
                placeholder="Enter bio"
                placeholderTextColor={colors.secondaryText}
            />

            <Button title="Add Artist" onPress={handleAddArtist} />
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
    errorText: {
        fontSize: 14,
        marginBottom: 10,
    },
});

export default AddArtistScreen;