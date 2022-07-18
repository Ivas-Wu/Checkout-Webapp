import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

function LoginScreen({navigation}) {

	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleLogIn = () => {
		navigation.navigate("Tab")
	}

	const handleSignup = () => {
		navigation.navigate("Sign Up")
	}

	return (
		<View style={styles.container}>
			<View>
				<Ionicons name="wallet-outline" size={100}/>
			</View>
			<View style={{marginBottom: 40}}>
				<Text style={styles.titleText}>
					Checkout
				</Text>
			</View>
			<TextInput
				multiline={true}
				style={styles.textInput}
				placeholder="User Name"
				onChangeText={(val) => setUserName(val)}
          	/>
			<TextInput
				multiline={true}
				style={styles.textInput}
				placeholder="Password"
				onChangeText={(val) => setPassword(val)}
          	/>
			<TouchableOpacity style={styles.button} onPress={handleLogIn}>
				<Text style={{fontWeight: "bold", fontSize: 15}}>Log In</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={handleSignup}>
				<Text style={{fontWeight: "bold", fontSize: 15}}>Sign Up</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "ghostwhite",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: "80%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightblue",
		margin: 5,
		borderRadius: 20,
	},
	textInput: {
		borderColor: "gray",
		width: "80%",
		height: 50,
		padding: 10,
		margin: 5,
		borderWidth: 1,
		borderRadius: 10
	},
	titleText: {
		fontSize: 40,
		fontWeight: "bold"
	}
});

module.exports = LoginScreen