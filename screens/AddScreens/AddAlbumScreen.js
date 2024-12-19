import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { addAlbum } from "../../api/api_calls";
import useValidUrl from "../../hooks/useValidUrl";

const AddAlbumScreen = ({ navigation, route }) => {
	const { artistId } = route.params;
	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const isValidUrl = useValidUrl();
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;

	const { container, label, input, errorText, placeholder } =
		createStyles(theme);

	const handleAddAlbum = async () => {
		const newErrors = {};
		if (!title) newErrors.title = "Title is required";
		if (!imgUrl) {
			newErrors.imgUrl = "Image URL is required";
		} else if (!isValidUrl(imgUrl)) {
			newErrors.imgUrl = "Image URL must be a valid URL";
		}
		if (!releaseDate) newErrors.releaseDate = "Release date is required";

		if (releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
			newErrors.releaseDate = "Release date must be in YYYY-MM-DD format";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const album = { title, imgUrl, releaseDate, artistId };
			const response = await addAlbum(album);

			if (!response.success) {
				const errorMessages = Object.entries(response.error)
					.map(([key, value]) => `${key}: ${value}`)
					.join("\n");
				setErrorMessage(errorMessages);
				return;
			}

			Alert.alert(
				"Album Added",
				`The album "${title}" has been added successfully.`
			);
			navigation.goBack();
		} catch (error) {
			console.error("Error adding album:", error.message);
			setErrorMessage(error.message);
		}
	};

	return (
		<View style={container}>
			<Text style={label}>Title:*</Text>
			{errors.title && <Text style={errorText}>{errors.title}</Text>}
			<TextInput
				style={input}
				value={title}
				onChangeText={setTitle}
				placeholder="Enter title"
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

			<Text style={label}>Release Date:*</Text>
			{errors.releaseDate && (
				<Text style={errorText}>{errors.releaseDate}</Text>
			)}
			<TextInput
				style={input}
				value={releaseDate}
				onChangeText={setReleaseDate}
				placeholder="Enter release date (YYYY-MM-DD)"
				placeholderTextColor={placeholder}
			/>

			{errorMessage ? <Text style={errorText}>{errorMessage}</Text> : null}

			<Button title="Add Album" onPress={handleAddAlbum} />
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

export default AddAlbumScreen;
