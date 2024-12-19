import React from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	Modal,
	FlatList,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Themes } from "../styling/Themes";

const ModalPicker = ({ visible, onClose, items, onSelect, title }) => {
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? Themes.dark : Themes.light;
	const { modalOverlay, modalContainer, modalTitle, modalItem, item } =
		createStyles(theme);

	return (
		<Modal
			transparent={true}
			visible={visible}
			animationType="slide"
			accessibilityViewIsModal={true}
			accessibilityLabel={title}
			w
		>
			<View style={modalOverlay}>
				<View style={modalContainer}>
					<Text
						style={modalTitle}
						accessibilityRole="header"
						accessibilityLabel={title}
					>
						{title}
					</Text>
					<FlatList
						data={items}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={modalItem}
								onPress={() => {
									onSelect(item.id);
									onClose();
								}}
								accessibilityRole="button"
								accessibilityLabel={`Select ${item.name || item.title}`}
							>
								<Text style={item}>{item.name || item.title}</Text>
							</TouchableOpacity>
						)}
					/>
					<Button
						title="Close"
						onPress={onClose}
						accessibilityRole="button"
						accessibilityLabel="Close modal"
					/>
				</View>
			</View>
		</Modal>
	);
};

const createStyles = (theme) =>
	StyleSheet.create({
		modalOverlay: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		modalContainer: {
			width: "80%",
			padding: 20,
			borderRadius: 10,
			backgroundColor: theme.background,
		},
		modalTitle: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			marginBottom: 20,
			color: theme.primaryText,
		},
		modalItem: {
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderBottomWidth: 1,
			borderBottomColor: theme.border,
		},
		item: {
			fontSize: theme.fontSizes.medium,
			color: theme.primaryText,
		},
	});

export default ModalPicker;
