import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Loading = () => {
    const { isDarkMode } = useTheme();

    return (
        <View
            style={[
                styles.centered,
                { backgroundColor: isDarkMode ? "black" : "#F2F2F2" },
            ]}
            accessibilityRole="alert"
            accessibilityLabel="Loading content"
        >
            <ActivityIndicator
                size="large"
                color={isDarkMode ? "white" : "black"}
                accessibilityRole="progressbar"
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

export default Loading;