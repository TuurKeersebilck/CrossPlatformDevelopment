import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Track from "./components/tracklist/track";

export default function App() {
	return (
		<View style={styles.container}>
			<Track
				title="first song"
				artist="first artist"
				duration="3:00"
				image="https://picsum.photos/200/200"
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
