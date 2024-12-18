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
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import { fetchArtistAlbums, addTrack } from "../api/api_calls";
import ModalPicker from "../components/ModalPicker";

const AddTrackScreen = ({ navigation, route }) => {
	const { artistId } = route.params;
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;
	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [duration, setDuration] = useState("");
	const [albums, setAlbums] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [isAlbumModalVisible, setIsAlbumModalVisible] = useState(false);
	const [errors, setErrors] = useState({});

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
	}, []);

	const handleAddTrack = async () => {
		const newErrors = {};
		if (!title) newErrors.title = "Title is required";
		if (!imgUrl) newErrors.imgUrl = "Image URL is required";
		if (!duration) newErrors.duration = "Duration is required";

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
				albumId: selectedAlbum,
			};
			const response = await addTrack(track);
			if (response.error) throw new Error(response.error);
			navigation.goBack();
			Alert.alert(
				"Track Added",
				`The track "${title}" has been added successfully.`
			);
		} catch (error) {
			console.error("Error adding track:", error.message);
		}   
	};

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<Text style={[styles.label, { color: colors.primaryText }]}>Title:*</Text>
			{errors.title && (
				<Text style={[styles.errorText, { color: colors.errorText }]}>
					{errors.title}
				</Text>
			)}
			<TextInput
				style={[
					styles.input,
					{ color: colors.primaryText, borderColor: colors.border },
				]}
				value={title}
				onChangeText={setTitle}
				placeholder="Enter title"
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

			<Text style={[styles.label, { color: colors.primaryText }]}>
				Select Album (optional):
			</Text>
			<TouchableOpacity
				style={[
					styles.pickerButton,
					{ backgroundColor: colors.background, borderColor: colors.border },
				]}
				onPress={() => setIsAlbumModalVisible(true)}
			>
				<Text style={{ color: colors.primaryText }}>
					{selectedAlbum
						? albums.find((a) => a.id === selectedAlbum)?.title
						: "Select an album (optional)"}
				</Text>
			</TouchableOpacity>

			<ModalPicker
				visible={isAlbumModalVisible}
				onClose={() => setIsAlbumModalVisible(false)}
				items={albums}
				onSelect={setSelectedAlbum}
				title="Select Album"
				colors={colors}
			/>

			<Button title="Add Track" onPress={handleAddTrack} />
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

export default AddTrackScreen;
