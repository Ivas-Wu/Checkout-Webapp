import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from "react-native";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as AuthSession from "expo-auth-session";
import Auth0 from 'react-native-auth0';
//https://github.com/GuyAvraham/expo-auth0-example-2020/blob/master/Utils/Auth.ts
//https://itnext.io/user-authentication-with-expo-cli-6ac853c272d4
function LoginScreen({navigation}) {

	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const auth0ClientId = "kvxyMO4VLss2cshj9N7dgL8BG9Oy6tXh";
	const auth0Domain = 'dev-6jv88y2a.us.auth0.com/';

	const useProxy = Platform.select({ web: false, default: true });
	const redirectUri = AuthSession.makeRedirectUri({ useProxy });
	console.log(redirectUri)

	/*const [request, result, promptAsync] = AuthSession.useAuthRequest(
		{
		  redirectUri,
		  clientId: auth0ClientId,
		  // id_token will return a JWT token
		  responseType: 'id_token',
		  // retrieve the user's profile
		  scopes: ['openid', 'profile', 'email'],
		  extraParams: {
			// ideally, this will be a random value
			nonce: 'nonce',
		  },
		},
		{ authorizationEndpoint }
	);*/

	const toQueryString = (params) => {
		var resultString = '?'// + new URLSearchParams(params).toString()
		let str = [];
		for (let p in params)
    		if (params.hasOwnProperty(p)) {
      			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    		}
  		resultString += str.join("&");
		console.log("resultString: ", resultString)
		return resultString
	}

	const login = async() => {
		console.log("login start")
		const params = {
			client_id: auth0ClientId,
			redirect_uri: redirectUri,
			// response_type:
			// id_token will return a JWT token with the profile as described on the scope
			// token will return access_token to use with further api calls
			response_type: "id_token",
			//nonce: "nonce", // ideally, this will be a random value
			//rememberLastLogin: true,
		};
		const queryParams = toQueryString(params);
		const authUrl = `https://${auth0Domain}/authorize${queryParams}`;
		console.log("full url: ", authUrl)

		const response = await AuthSession.startAsync({
			authUrl,
			showInRecents: true
		});

		console.log(response)
	}
	

	const handleLogIn = () => {
		navigation.navigate("Tab")
		
	}

	const handleSignup = () => {
		navigation.navigate("Sign Up")
		console.log(AuthSession.getRedirectUrl())
	}

	return (
		<View style={styles.container}>
			<View>
				<Ionicons name="wallet-outline" size={100}/>
			</View>
			<View style={{marginBottom: 40}}>
				<Text style={styles.titleText}>
					Checkout
					{AuthSession.getRedirectUrl()}
				</Text>
			</View>
			<TextInput
				multiline={true}
				style={styles.textInput}
				//placeholder="User Name"
				defaultValue="testuser@gmail.com"
				onChangeText={(val) => setUserName(val)}
          	/>
			<TextInput
				secureTextEntry={true}
				style={styles.textInput}
				placeholder="Password"
				defaultValue="Password"
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