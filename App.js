import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./config/navigation/AppNavigator";

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
