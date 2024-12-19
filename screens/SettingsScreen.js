import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";
import {
	getFavoriteArtists,
	getFavoriteTracks,
	getFavoriteAlbums,
} from "../api/api_calls";
import Icon from "react-native-vector-icons/Ionicons";
import ArtistRow from "../components/rows/ArtistRow";
import TrackRow from "../components/rows/TrackRow";
import AlbumRow from "../components/rows/AlbumRow";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import i18n from "../config/i18n";

const SettingsScreen = ({ navigation }) => {
	const { isDarkMode, toggleTheme } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { t } = useTranslation();
	const [language, setLanguage] = useState(i18n.language);
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: "English", value: "en" },
		{ label: "Nederlands", value: "nl" },
	]);

	const changeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setLanguage(lang);
	};

	const {
		container,
		contentContainer,
		libraryContainer,
		headerIconButton,
		favoriteSection,
		sectionHeader,
		favoriteList,
		emptyStateMessage,
		darkModeSection,
		sectionTitle,
		libraryTitle,
		languageSection,
		pickerStyle,
	} = createStyles(theme);

	const [favoriteArtists, setFavoriteArtists] = useState([]);
	const [favoriteTracks, setFavoriteTracks] = useState([]);
	const [favoriteAlbums, setFavoriteAlbums] = useState([]);

	const fetchFavorites = async () => {
		try {
			const [artistsData, tracksData, albumsData] = await Promise.all([
				getFavoriteArtists(),
				getFavoriteTracks(),
				getFavoriteAlbums(),
			]);
			setFavoriteArtists(artistsData);
			setFavoriteTracks(tracksData);
			setFavoriteAlbums(albumsData);
		} catch (error) {
			console.error("Error fetching favorites:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchFavorites();
		}, [])
	);

	const renderFavoriteSection = (title, data, type) => (
		<View style={favoriteSection}>
			<View style={sectionHeader}>
				<Text style={sectionTitle}>{title}</Text>
			</View>
			{data.length > 0 ? (
				<FlatList
					data={data.slice(0, 5)}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						if (type === "artist") {
							return <ArtistRow artist={item} navigation={navigation} />;
						} else if (type === "track") {
							return <TrackRow track={item} navigation={navigation} />;
						} else if (type === "album") {
							return <AlbumRow album={item} navigation={navigation} />;
						}
						return null;
					}}
					contentContainerStyle={favoriteList}
				/>
			) : (
				<Text style={emptyStateMessage}>
					{t("noFavorites", { title: title.toLowerCase() })}
				</Text>
			)}
		</View>
	);

	return (
		<SafeAreaView style={container} accessibilityRole="main">
			<View style={contentContainer}>
				<View style={darkModeSection}>
					<Text style={sectionTitle}>{t("toggleTheme")}</Text>
					<TouchableOpacity
						onPress={toggleTheme}
						style={headerIconButton}
						accessibilityRole="button"
						accessibilityLabel={`Toggle dark mode, currently ${
							isDarkMode ? "enabled" : "disabled"
						}`}
						accessibilityHint="Double tap to toggle dark mode"
					>
						<Icon
							name={isDarkMode ? "sunny" : "moon"}
							size={25}
							color={theme.primaryText}
						/>
					</TouchableOpacity>
				</View>

				<View style={languageSection}>
					<Text style={sectionTitle}>{t("language")}</Text>
					<DropDownPicker
						open={open}
						value={language}
						items={items}
						setOpen={setOpen}
						setValue={setLanguage}
						setItems={setItems}
						onChangeValue={changeLanguage}
						style={pickerStyle}
						containerStyle={{ height: 40 }}
						dropDownStyle={{ backgroundColor: theme.background }}
					/>
				</View>

				<View style={libraryContainer}>
					<Text style={libraryTitle}>{t("yourLibrary")}</Text>
					<FlatList
						data={[
							{
								title: t("favoriteArtists"),
								data: favoriteArtists,
								type: "artist",
							},
							{
								title: t("favoriteTracks"),
								data: favoriteTracks,
								type: "track",
							},
							{
								title: t("favoriteAlbums"),
								data: favoriteAlbums,
								type: "album",
							},
						]}
						keyExtractor={(item) => item.title}
						renderItem={({ item }) =>
							renderFavoriteSection(item.title, item.data, item.type)
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
		},
		contentContainer: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 16,
		},
		darkModeSection: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: theme.surface,
			borderRadius: 12,
			marginBottom: 24,
		},
		headerIconButton: {
			padding: 12,
			borderRadius: 8,
			backgroundColor: theme.accent,
		},
		languageSection: {
			paddingBottom: 50,
			zIndex: 2,
			position: "relative",
		},
		pickerStyle: {
			borderColor: theme.border,
			marginTop: 8,
			height: 48,
		},
		libraryContainer: {
			flex: 1,
		},
		libraryTitle: {
			fontSize: theme.fontSizes.xlarge,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
			marginBottom: 16,
		},
		favoriteSection: {
			backgroundColor: theme.surface,
			marginBottom: 16,
			padding: 16,
			borderRadius: 12,
		},
		sectionHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 12,
		},
		sectionTitle: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
		},
		favoriteList: {
			paddingTop: 8,
		},
		emptyStateMessage: {
			textAlign: "center",
			fontStyle: "italic",
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
			paddingVertical: 16,
		},
	});

export default SettingsScreen;
