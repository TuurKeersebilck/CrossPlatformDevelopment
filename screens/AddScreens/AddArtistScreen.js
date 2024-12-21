import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { addArtist } from "../../api/api_calls";
import useValidUrl from "../../hooks/useValidUrl";
import { useTranslation } from "react-i18next";

const AddArtistScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [bio, setBio] = useState("");
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const isValidUrl = useValidUrl();
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { container, label, input, errorText, placeholder } =
		createStyles(currentTheme);

	const handleAddArtist = async () => {
		const newErrors = {};
		if (!name) newErrors.name = t("nameRequired");
		if (!imgUrl) {
			newErrors.imgUrl = t("imgUrlRequired");
		} else if (!isValidUrl(imgUrl)) {
			newErrors.imgUrl = t("imgUrlInvalid");
		}
		if (!bio) newErrors.bio = t("bioRequired");

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

			Alert.alert(t("artistAddedTitle"), t("artistAddedMessage", { name }));
			navigation.goBack();
		} catch (error) {
			console.error("Error adding artist:", error.message);
			setErrorMessage(error.message);
		}
	};

	return (
		<View style={container}>
			<Text style={label} accessibilityRole="label">
				{t("nameLabel")}:*
			</Text>
			{errors.name && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.name}
				</Text>
			)}
			<TextInput
				style={input}
				value={name}
				onChangeText={setName}
				placeholder={t("namePlaceholder")}
				placeholderTextColor={placeholder.color}
				accessibilityLabel={t("namePlaceholder")}
			/>

			<Text style={label} accessibilityRole="label">
				{t("imgUrlLabel")}:*
			</Text>
			{errors.imgUrl && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.imgUrl}
				</Text>
			)}
			<TextInput
				style={input}
				value={imgUrl}
				onChangeText={setImgUrl}
				placeholder={t("imgUrlPlaceholder")}
				placeholderTextColor={placeholder.color}
				accessibilityLabel={t("imgUrlPlaceholder")}
			/>

			<Text style={label} accessibilityRole="label">
				{t("bioLabel")}:*
			</Text>
			{errors.bio && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.bio}
				</Text>
			)}
			<TextInput
				style={input}
				value={bio}
				onChangeText={setBio}
				placeholder={t("bioPlaceholder")}
				placeholderTextColor={placeholder.color}
				accessibilityLabel={t("bioPlaceholder")}
			/>

			{errorMessage ? (
				<Text style={errorText} accessibilityRole="alert">
					{errorMessage}
				</Text>
			) : null}

			<Button
				title={t("addArtistButton")}
				onPress={handleAddArtist}
				color={theme.buttonBackground}
				accessibilityLabel={t("addArtistButton")}
				accessibilityHint={t("addArtistButtonHint")}
			/>
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
