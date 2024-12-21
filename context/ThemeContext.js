import React, { createContext, useState, useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const loadTheme = async () => {
			const savedTheme = await AsyncStorage.getItem("theme");
			if (savedTheme !== null) {
				setIsDarkMode(savedTheme === "dark");
			}
		};
		loadTheme();
	}, []);

	const toggleTheme = async () => {
		const newTheme = !isDarkMode;
		setIsDarkMode(newTheme);
		await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				backgroundColor={isDarkMode ? "#000000" : "#FFFFFF"}
			/>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
