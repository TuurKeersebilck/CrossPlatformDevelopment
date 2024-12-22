import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Themes } from "../../styling/Themes";
import { fetchArtistAlbums, addTrack } from "../../api/api_calls";
import ModalPicker from "../../components/ModalPicker";
import useValidUrl from "../../hooks/useValidUrl";
import { useTranslation } from "react-i18next";

const AddTrackScreen = ({ navigation, route }) => {
	const { artistId } = route.params;
	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [duration, setDuration] = useState("");
	const [albums, setAlbums] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [isAlbumModalVisible, setIsAlbumModalVisible] = useState(false);
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const isValidUrl = useValidUrl();
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { container, label, input, pickerButton, errorText, placeholder } =
		createStyles(currentTheme);

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				const albumsData = await fetchArtistAlbums(artistId);
				setAlbums(albumsData);
			} catch (error) {
				console.error("Error fetching albums:", error);
			}
		};

		fetchAlbums();
	}, [artistId]);

	const handleAddTrack = async () => {
		const newErrors = {};
		if (!title) newErrors.title = t("titleRequired");
		if (!imgUrl) {
			newErrors.imgUrl = t("imgUrlRequired");
		} else if (!isValidUrl(imgUrl)) {
			newErrors.imgUrl = t("imgUrlInvalid");
		}
		if (!duration) {
			newErrors.duration = t("durationRequired");
		} else if (!/^\d{2}:\d{2}$/.test(duration)) {
			newErrors.duration = t("durationInvalid");
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const track = {
				title,
				imgUrl,
				duration,
				artistId,
				albumId: selectedAlbum ? selectedAlbum.id : null,
			};
			const result = await addTrack(track);

			if (!result.success) {
				const errorMessages = Object.entries(result.error)
					.map(([key, value]) => `${key}: ${value}`)
					.join("\n");
				setErrorMessage(errorMessages);
				return;
			}

			Alert.alert(t("trackAddedTitle"), t("trackAddedMessage", { title }));
			navigation.goBack();
		} catch (error) {
			console.error("Error adding track:", error.message);
			setErrorMessage(error.message);
		}
	};

		const handleDurationChange = (text) => {
		const cleaned = text.replace(/[^0-9]/g, "");
	
		let formatted = cleaned;
		if (cleaned.length >= 2) {
			let minutes = cleaned.slice(0, 2);
			let seconds = cleaned.slice(2, 4);
	
			if (seconds.length > 0 && parseInt(seconds[0], 10) > 5) {
				seconds = "5" + (seconds.length > 1 ? seconds[1] : "");
			}
	
			formatted = `${minutes}:${seconds}`;
		}
	
		setDuration(formatted);
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
				placeholderTextColor={placeholder}
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
				placeholderTextColor={placeholder}
				accessibilityLabel={t("imgUrlPlaceholder")}
			/>

			<Text style={label} accessibilityRole="text">
				{t("durationLabel")}:*
			</Text>
			{errors.duration && (
				<Text style={errorText} accessibilityRole="alert">
					{errors.duration}
				</Text>
			)}
			<TextInput
				style={input}
				value={duration}
				onChangeText={handleDurationChange}
				placeholder={t("durationPlaceholder")}
				placeholderTextColor={placeholder}
				keyboardType="numeric"
				maxLength={5}
				accessibilityLabel={t("durationPlaceholder")}
			/>

			<Text style={label} accessibilityRole="text">
				{t("selectAlbum")}:
			</Text>
			<TouchableOpacity
				style={pickerButton}
				onPress={() => setIsAlbumModalVisible(true)}
				accessibilityRole="button"
				accessibilityLabel={t("selectAlbum")}
				accessibilityHint={t("openAlbumPicker")}
			>
				<Text style={label}>
					{selectedAlbum ? selectedAlbum.title : t("selectAlbum")}
				</Text>
			</TouchableOpacity>

			<ModalPicker
				visible={isAlbumModalVisible}
				onClose={() => setIsAlbumModalVisible(false)}
				items={albums}
				onSelect={(album) => setSelectedAlbum(album)}
				title={t("selectAlbum")}
				accessibilityLabel={t("albumPicker")}
			/>

			{errorMessage ? (
				<Text style={errorText} accessibilityRole="alert">
					{errorMessage}
				</Text>
			) : null}

			<Button
				title={t("addTrackButton")}
				onPress={handleAddTrack}
				color={theme.buttonBackground}
				accessibilityLabel={t("addTrackButton")}
				accessibilityHint={t("addTrackButtonHint")}
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
		pickerButton: {
			height: 40,
			borderWidth: 1,
			borderRadius: 5,
			justifyContent: "center",
			paddingHorizontal: 10,
			marginBottom: 20,
			backgroundColor: theme.background,
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

export default AddTrackScreen;
