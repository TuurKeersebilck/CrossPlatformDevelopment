import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
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
	};

	const handleAdd = async () => {
		try {
			let response;
			if (type === "artist") {
				const artist = { name, imgUrl, bio };
				response = await addArtist(artist);
			} else if (type === "album") {
				const album = {
					title: name,
					imgUrl,
					releaseDate,
					artistId: selectedArtist,
				};
				response = await addAlbum(album);
			} else if (type === "track") {
				const track = {
					title: name,
					imgUrl,
					duration,
					artistId: selectedArtist,
					albumId: selectedAlbum,
				};
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
					Select Artist:
				</Text>
				<TouchableOpacity
					style={[
						styles.pickerButton,
						{
							backgroundColor: colors.background,
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
							backgroundColor: colors.background,
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

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
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
						Name:
					</Text>
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
						Image URL:
					</Text>
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
								Release Date:
							</Text>
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
								Duration:
							</Text>
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
});

export default AddItemScreen;
