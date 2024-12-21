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
import { useTranslation } from "react-i18next";

const ModalPicker = ({ visible, onClose, items, onSelect, title }) => {
	const { t } = useTranslation();

	const { theme } = useTheme();
	const currentTheme = Themes[theme];

	const { modalOverlay, modalContainer, modalTitle, modalItem, item } =
		createStyles(currentTheme);

	return (
		<Modal
			transparent={true}
			visible={visible}
			animationType="slide"
			accessibilityViewIsModal={true}
			accessibilityLabel={title}
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
									onSelect(item);
									onClose();
								}}
								accessibilityRole="button"
								accessibilityLabel={item.title}
								accessibilityHint={t("selectItem")}
							>
								<Text style={item}>{item.title}</Text>
							</TouchableOpacity>
						)}
						accessibilityRole="list"
						accessibilityLabel={t("itemList")}
					/>
					<Button
						title={t("closeButton")}
						onPress={onClose}
						color={currentTheme.buttonBackground}
						accessibilityLabel={t("closeButton")}
						accessibilityHint={t("closeModal")}
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
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			justifyContent: "center",
			alignItems: "center",
		},
		modalContainer: {
			width: "80%",
			backgroundColor: theme.background,
			borderRadius: 10,
			padding: 20,
		},
		modalTitle: {
			fontSize: theme.fontSizes.large,
			fontWeight: theme.fontWeights.bold,
			color: theme.primaryText,
			marginBottom: 20,
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
