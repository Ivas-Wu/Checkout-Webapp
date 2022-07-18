import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import * as ImagePicker from 'expo-image-picker';

function SettingsScreen({navigation}) {
    const handleLogOut = () => {
		navigation.navigate("Login")
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.Button} onPress={handleLogOut}>
				<Text>Log Out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "gold",
        padding: 10,
        borderRadius: 10,
    },
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    Button: {
		width: "60%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightblue",
		margin: 5,
		borderRadius: 10,
	},
});

module.exports = SettingsScreen