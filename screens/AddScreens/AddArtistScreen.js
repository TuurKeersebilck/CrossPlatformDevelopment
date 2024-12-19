import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { addArtist } from "../../api/api_calls";
import useValidUrl from "../../hooks/useValidUrl";

const AddArtistScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [bio, setBio] = useState("");
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const isValidUrl = useValidUrl();
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const { container, label, input, errorText, placeholder } =
		createStyles(theme);

	const handleAddArtist = async () => {
		const newErrors = {};
		if (!name) newErrors.name = "Name is required";
		if (!imgUrl) {
			newErrors.imgUrl = "Image URL is required";
		} else if (!isValidUrl(imgUrl)) {
			newErrors.imgUrl = "Image URL must be a valid URL";
		}
		if (!bio) newErrors.bio = "Bio is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const artist = { name, imgUrl, bio };
			const response = await addArtist(artist);

			if (!response.success) {
				const errorMessages = Object.entries(response.error)
					.map(([key, value]) => `${key}: ${value}`)
					.join("\n");
				setErrorMessage(errorMessages);
				return;
			}

			Alert.alert(
				"Artist Added",
				`The artist "${name}" has been added successfully.`
			);
			navigation.goBack();
		} catch (error) {
			console.error("Error adding artist:", error.message);
			setErrorMessage(error.message);
		}
	};

	return (
		<View style={container}>
			<Text style={label}>Name:*</Text>
			{errors.name && <Text style={errorText}>{errors.name}</Text>}
			<TextInput
				style={input}
				value={name}
				onChangeText={setName}
				placeholder="Enter name"
				placeholderTextColor={placeholder}
			/>

			<Text style={label}>Image URL:*</Text>
			{errors.imgUrl && <Text style={errorText}>{errors.imgUrl}</Text>}
			<TextInput
				style={input}
				value={imgUrl}
				onChangeText={setImgUrl}
				placeholder="Enter image URL"
				placeholderTextColor={placeholder}
			/>

			<Text style={label}>Bio:*</Text>
			{errors.bio && <Text style={errorText}>{errors.bio}</Text>}
			<TextInput
				style={input}
				value={bio}
				onChangeText={setBio}
				placeholder="Enter bio"
				placeholderTextColor={placeholder}
			/>

			{errorMessage ? <Text style={errorText}>{errorMessage}</Text> : null}

			<Button title="Add Artist" onPress={handleAddArtist} />
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			justifyContent: "center",
			backgroundColor: theme.background,
		},
		label: {
			fontSize: theme.fontSizes.medium,
			marginBottom: 10,
			color: theme.primaryText,
		},
		input: {
			height: 40,
			borderWidth: 1,
			borderRadius: 5,
			paddingHorizontal: 10,
			marginBottom: 20,
			color: theme.primaryText,
			borderColor: theme.border,
		},
		errorText: {
			fontSize: theme.fontSizes.medium,
			textAlign: "center",
			marginTop: 20,
			color: theme.errorText,
		},
		placeholder: {
			color: theme.secondaryText,
		},
	});

export default AddArtistScreen;
