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
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();

	const { container, label, input, pickerButton, errorText, placeholder } =
		createStyles(theme);

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
				albumId: selectedAlbum.id,
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
			formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
		}

		setDuration(formatted);
	};

	return (
		<View style={container}>
			<Text style={label}>{t("titleLabel")}:*</Text>
			{errors.title && <Text style={errorText}>{errors.title}</Text>}
			<TextInput
				style={input}
				value={title}
				onChangeText={setTitle}
				placeholder={t("titlePlaceholder")}
				placeholderTextColor={placeholder}
			/>

			<Text style={label}>{t("imgUrlLabel")}:*</Text>
			{errors.imgUrl && <Text style={errorText}>{errors.imgUrl}</Text>}
			<TextInput
				style={input}
				value={imgUrl}
				onChangeText={setImgUrl}
				placeholder={t("imgUrlPlaceholder")}
				placeholderTextColor={placeholder}
			/>

			<Text style={label}>{t("durationLabel")}:*</Text>
			{errors.duration && <Text style={errorText}>{errors.duration}</Text>}
			<TextInput
				style={input}
				value={duration}
				onChangeText={handleDurationChange}
				placeholder={t("durationPlaceholder")}
				placeholderTextColor={placeholder}
				keyboardType="numeric"
				maxLength={5}
			/>

			<Text style={label}>{t("selectAlbum")}:</Text>
			<TouchableOpacity
				style={pickerButton}
				onPress={() => setIsAlbumModalVisible(true)}
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
			/>

			{errorMessage ? <Text style={errorText}>{errorMessage}</Text> : null}

			<Button
				title={t("addTrackButton")}
				onPress={handleAddTrack}
				color={theme.buttonBackground}
				accessibilityLabel={t("addTrackButton")}
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
