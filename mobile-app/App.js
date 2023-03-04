import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

var TabScreen = require("./app/screens/TabScreen");
var LoginScreen = require("./app/screens/LoginScreen");
var SignupScreen = require("./app/screens/SignupScreen");
var ScannerScreen = require("./app/screens/ScannerScreen");

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={LoginScreen}
				></Stack.Screen>
				<Stack.Screen name="Tab" component={TabScreen}></Stack.Screen>
				<Stack.Screen name="Scanner" component={ScannerScreen}></Stack.Screen>
				<Stack.Screen name="Sign Up" component={SignupScreen}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#abf",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		alignItems: "center",
		backgroundColor: "gold",
		padding: 10,
		borderRadius: 10,
	},
	goal: {
		flex: 1,
		backgroundColor: "deepskyblue",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		borderRadius: 10,
		margin: 5,
	},
	pageBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	goalScroll: {
		width: "100%",
		padding: 10,
		borderRadius: 10,
	},
});
