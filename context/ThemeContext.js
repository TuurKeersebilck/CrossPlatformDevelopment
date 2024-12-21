import React, { createContext, useState, useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Themes } from "../styling/Themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const loadTheme = async () => {
			const savedTheme = await AsyncStorage.getItem("theme");
			if (savedTheme !== null) {
				setTheme(savedTheme);
			}
		};
		loadTheme();
	}, []);

	const toggleTheme = async () => {
		const themeKeys = Object.keys(Themes);
		const currentIndex = themeKeys.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themeKeys.length;
		const newTheme = themeKeys[nextIndex];
		setTheme(newTheme);
		await AsyncStorage.setItem("theme", newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<StatusBar
				barStyle={theme === "dark" ? "light-content" : "dark-content"}
				backgroundColor={Themes[theme].background}
			/>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
