import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";

const AddItemScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;
    const [name, setName] = useState("");
    const [type, setType] = useState("artist"); // Default type is artist

    const handleAdd = () => {
        // Handle the addition of the artist, album, or track
        console.log(`Adding ${type}: ${name}`);
        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.label, { color: colors.primaryText }]}>Name:</Text>
            <TextInput
                style={[styles.input, { color: colors.primaryText, borderColor: colors.border }]}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor={colors.secondaryText}
            />
            <Text style={[styles.label, { color: colors.primaryText }]}>Type:</Text>
            <View style={styles.buttonContainer}>
                <Button title="Artist" onPress={() => setType("artist")} />
                <Button title="Album" onPress={() => setType("album")} />
                <Button title="Track" onPress={() => setType("track")} />
            </View>
            <Button title="Add" onPress={handleAdd} />
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
});

export default AddItemScreen;