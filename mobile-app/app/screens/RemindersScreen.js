import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";

function SettingsScreen({navigation}) {

	return (
		<View style={styles.pageBackground}>
			
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
        backgroundColor: "#E7F8FF"
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