import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import ArtistRow from "../components/rows/ArtistRow";
import { getArtists } from "../api/api_calls";
import { useTheme } from "../context/ThemeContext";
import LoadingIndicator from "../components/Loading";
import { Themes } from "../styling/Themes";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const ArtistsScreen = ({ navigation }) => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { container, scrollView, centered, empty } = createStyles(currentTheme);

	const fetchArtists = async () => {
		try {
			setLoading(true);
			const artistsData = await getArtists();
			setArtists(artistsData);
		} catch (error) {
			console.error("Error fetching artists:", error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchArtists();
		}, [])
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (artists.length === 0) {
		return (
			<View
				style={centered}
				accessibilityRole="alert"
				accessibilityLabel={t("emptyArtistsList")}
			>
				<Text style={empty}>{t("noArtistsAvailable")}</Text>
			</View>
		);
	}

	return (
		<View style={container}>
			<Button
				title={t("addArtist")}
				onPress={() => navigation.navigate("AddArtistScreen")}
				accessibilityRole="button"
				accessibilityLabel={t("addArtist")}
			/>
			<FlatList
				data={artists}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<ArtistRow
						artist={item}
						navigation={navigation}
						accessibilityRole="button"
						accessibilityLabel={`${t("artist")}: ${item.name}`}
						onPress={() =>
							navigation.navigate("ArtistDetailScreen", { artistId: item.id })
						}
					/>
				)}
				contentContainerStyle={scrollView}
				accessibilityRole="list"
				accessibilityLabel={t("artistsList")}
			/>
		</View>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
		},
		scrollView: {
			marginVertical: 10,
			paddingHorizontal: 10,
		},
		centered: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.background,
		},
		empty: {
			textAlign: "center",
			fontStyle: "italic",
			color: theme.secondaryText,
			fontSize: theme.fontSizes.medium,
		},
	});

export default ArtistsScreen;
