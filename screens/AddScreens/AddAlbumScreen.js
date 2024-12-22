import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { addAlbum } from "../../api/api_calls";
import useValidUrl from "../../hooks/useValidUrl";
import { useTranslation } from "react-i18next";

const AddAlbumScreen = ({ navigation, route }) => {
	const { artistId } = route.params;
	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [releaseDate, setReleaseDate] = useState("");
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const isValidUrl = useValidUrl();
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { container, label, input, errorText, placeholder } =
		createStyles(currentTheme);

	const handleAddAlbum = async () => {
		const newErrors = {};
		if (!title) newErrors.title = t("titleRequired");
		if (!imgUrl) {
			newErrors.imgUrl = t("imgUrlRequired");
		} else if (!isValidUrl(imgUrl)) {
			newErrors.imgUrl = t("imgUrlInvalid");
		}
		if (!releaseDate) newErrors.releaseDate = t("releaseDateRequired");

		if (releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
			newErrors.releaseDate = t("releaseDateInvalid");
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

			Alert.alert(t("albumAddedTitle"), t("albumAddedMessage", { title }));
			navigation.goBack();
		} catch (error) {
			console.error("Error adding album:", error.message);
			setErrorMessage(error.message);
		}
	};

	return (
		<View style={container}>
			<Text style={label} accessibilityRole="text">
				{t("titleLabel")}:*
			</Text>
			{errors.title && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.title}
				</Text>
			)}
			<TextInput
				style={input}
				value={title}
				onChangeText={setTitle}
				placeholder={t("titlePlaceholder")}
				placeholderTextColor={placeholder.color}
				accessibilityLabel={t("titlePlaceholder")}
			/>

			<Text style={label} accessibilityRole="text">
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

			<Text style={label} accessibilityRole="text">
				{t("releaseDateLabel")}:*
			</Text>
			{errors.releaseDate && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.releaseDate}
				</Text>
			)}
			<TextInput
				style={input}
				value={releaseDate}
				onChangeText={setReleaseDate}
				placeholder={t("releaseDatePlaceholder")}
				placeholderTextColor={placeholder.color}
				accessibilityLabel={t("releaseDatePlaceholder")}
			/>

			{errorMessage ? (
				<Text style={errorText} accessibilityRole="alert">
					{errorMessage}
				</Text>
			) : null}

			<Button
				title={t("addAlbumButton")}
				onPress={handleAddAlbum}
				color={theme.buttonBackground}
				accessibilityLabel={t("addAlbumButton")}
				accessibilityHint={t("addAlbumButtonHint")}
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

export default AddAlbumScreen;
