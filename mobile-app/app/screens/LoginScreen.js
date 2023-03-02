import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from "react-native";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as AuthSession from "expo-auth-session";
import mainStyles from "../Styles";
import { LinearGradient } from 'expo-linear-gradient'
//https://github.com/GuyAvraham/expo-auth0-example-2020/blob/master/Utils/Auth.ts
//https://itnext.io/user-authentication-with-expo-cli-6ac853c272d4
function LoginScreen({navigation}) {

	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleLogIn = () => {
		navigation.navigate("Tab")
		
	}

	const handleSignup = () => {
		navigation.navigate("Sign Up")
		console.log(AuthSession.getRedirectUrl())
	}

	return (
		<LinearGradient
			colors={['#73D1FF', '#B1DBFF']}
			style={styles.background}
			start={{ x: 1, y: 1.5 }}
			end={{ x: 0, y: 0 }}
		>
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
				//placeholder="User Name"
				defaultValue="demo1@example.com"
				onChangeText={(val) => setUserName(val)}
          	/>
			<TextInput
				secureTextEntry={true}
				style={styles.textInput}
				placeholder="Password"
				defaultValue="Password123!"
				onChangeText={(val) => setPassword(val)}
          	/>
			<TouchableOpacity style={styles.button} onPress={handleLogIn}>
				<Text style={{fontWeight: "bold", fontSize: 15}}>Log In</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity style={styles.button} onPress={handleSignup}>
				<Text style={{fontWeight: "bold", fontSize: 15}}>Sign Up</Text>
			</TouchableOpacity> */}
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "80%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		margin: 5,
		borderRadius: 15,
	},
	textInput: {
		borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
        width: "80%",
        height: 40,
        padding: 8,
        margin: 5,
		backgroundColor: "white",
        color: 'black',
	},
	titleText: {
		fontSize: 40,
		fontWeight: "bold"
	}
});

module.exports = LoginScreen