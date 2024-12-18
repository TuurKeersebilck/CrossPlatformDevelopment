import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styling/Colors";

const AllFavoritesScreen = ({ route, navigation }) => {
    const { title, data, type } = route.params;
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? Colors.dark : Colors.light;

    const renderFavoriteItem = ({ item }) => (
        <TouchableOpacity 
            style={[
                styles.favoriteItem,
                { backgroundColor: colors.cardBackground }
            ]}
            onPress={() => {/* Item press logic */}}
        >
            {item.imageUrl && (
                <Image 
                    source={{ uri: item.imageUrl }}
                    style={styles.favoriteItemImage}
                />
            )}
            <View style={styles.favoriteItemTextContainer}>
                <Text 
                    style={[
                        styles.favoriteItemText, 
                        { color: colors.primaryText }
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.name || item.title}
                </Text>
                <Text 
                    style={[
                        styles.favoriteItemSubtext, 
                        { color: colors.secondaryText }
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.header, { color: colors.primaryText }]}>
                {title}
            </Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFavoriteItem}
                contentContainerStyle={styles.favoriteList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    favoriteList: {
        paddingVertical: 10,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    favoriteItemImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    favoriteItemTextContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    favoriteItemText: {
        fontSize: 16,
        fontWeight: '600',
    },
    favoriteItemSubtext: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default AllFavoritesScreen;