import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../../screens/SettingsScreen";
import AddItemScreen from "../../../screens/AddItemScreen";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
    const { isDarkMode } = useTheme();

	return (
		<Stack.Navigator
        initialRouteName="SettingsScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDarkMode ? "black" : "white",
                },
                headerTintColor: isDarkMode ? "white" : "black",
                headerBackTitleStyle: {
                    color: isDarkMode ? "tomato" : "blue",
                },
                headerBackImage: () => (
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={isDarkMode ? "tomato" : "blue"} 
                    />
                ),
            }}
            >
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{ title: "Settings" }}
			/>
			<Stack.Screen
				name="AddItemScreen"
				component={AddItemScreen}
				options={{ title: "Add Item" }}
			/>
		</Stack.Navigator>
	);
};

export default SettingsStackNavigator;
