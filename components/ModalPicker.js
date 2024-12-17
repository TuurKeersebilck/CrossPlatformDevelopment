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
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            accessibilityViewIsModal={true}
            accessibilityLabel={title}w
        >
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContainer,
                        { backgroundColor: colors.background },
                    ]}
                >
                    <Text
                        style={[styles.modalTitle, { color: colors.primaryText }]}
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
                                style={styles.modalItem}
                                onPress={() => {
                                    onSelect(item.id);
                                    onClose();
                                }}
                                accessibilityRole="button"
                                accessibilityLabel={`Select ${item.name || item.title}`}
                            >
                                <Text style={{ color: colors.primaryText }}>
                                    {item.name || item.title}
                                </Text>
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

const styles = StyleSheet.create({
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    modalItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default ModalPicker;