import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const LoadingIndicator = () => {
    const { isDarkMode } = useTheme();

    return (
        <View
            style={[
                styles.centered,
                { backgroundColor: isDarkMode ? "black" : "#F2F2F2" },
            ]}
            accessibilityRole="alert"
            accessibilityLabel="Loading"
        >
            <ActivityIndicator
                size="large"
                color={isDarkMode ? "white" : "black"}
                accessibilityRole="Loading"
                accessibilityLabel="Loading indicator"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoadingIndicator;