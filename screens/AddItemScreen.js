import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Picker,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";
import { getArtists, fetchArtistAlbums } from "../api/api_calls";

const AddItemScreen = ({ navigation }) => {
	const { isDarkMode } = useTheme();
	const colors = isDarkMode ? Colors.dark : Colors.light;
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [artists, setArtists] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [selectedArtist, setSelectedArtist] = useState("");
	const [selectedAlbum, setSelectedAlbum] = useState("");

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
		setSelectedArtist("");
		setSelectedAlbum("");
		setAlbums([]);
	};

	const handleAdd = () => {
		console.log(`Adding ${type}: ${name}`);
		if (type === "album" || type === "track") {
			console.log(`Linked to artist: ${selectedArtist}`);
		}
		if (type === "track" && selectedAlbum) {
			console.log(`Linked to album: ${selectedAlbum}`);
		}
		navigation.goBack();
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

					{(type === "album" || type === "track") && (
						<>
							<Text style={[styles.label, { color: colors.primaryText }]}>
								Select Artist:
							</Text>
							<Picker
								selectedValue={selectedArtist}
								style={[styles.input, { borderColor: colors.border }]}
								onValueChange={(itemValue) => setSelectedArtist(itemValue)}
							>
								<Picker.Item label="Select an artist" value="" />
								{artists.map((artist) => (
									<Picker.Item
										key={artist.id}
										label={artist.name}
										value={artist.id}
									/>
								))}
							</Picker>
						</>
					)}

					{type === "track" && (
						<>
							<Text style={[styles.label, { color: colors.primaryText }]}>
								Select Album (optional):
							</Text>
							<Picker
								selectedValue={selectedAlbum}
								style={[styles.input, { borderColor: colors.border }]}
								onValueChange={(itemValue) => setSelectedAlbum(itemValue)}
							>
								<Picker.Item label="None" value="" />
								{albums.map((album) => (
									<Picker.Item
										key={album.id}
										label={album.title}
										value={album.id}
									/>
								))}
							</Picker>
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
        backgroundColor: "white"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
});

export default AddItemScreen;
