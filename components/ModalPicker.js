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

const ModalPicker = ({ visible, onClose, items, onSelect, title, colors }) => {
	return (
		<Modal transparent={true} visible={visible} animationType="slide">
			<View style={styles.modalOverlay}>
				<View
					style={[
						styles.modalContainer,
						{ backgroundColor: colors.background },
					]}
				>
					<Text style={styles.modalTitle}>{title}</Text>
					<FlatList
						data={items}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.modalItem}
								onPress={() => {
									onSelect(item.id);
									onClose();
								}}
							>
								<Text style={{ color: colors.primaryText }}>
									{item.name || item.title}
								</Text>
							</TouchableOpacity>
						)}
					/>
					<Button title="Cancel" onPress={onClose} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		margin: 20,
		borderRadius: 10,
		padding: 20,
		maxHeight: "80%",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	modalItem: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
});

export default ModalPicker;
