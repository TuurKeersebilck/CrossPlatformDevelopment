import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./config/navigation/AppNavigator";
import "./config/i18n.js";

const App = () => {
	return (
		<ThemeProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</ThemeProvider>
	);
};

export default App;
