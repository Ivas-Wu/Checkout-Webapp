import { StyleSheet, Text, View, Button, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import mainStyles from "../Styles";

var ScannerScreen = require("./ScannerScreen");
var GoalsScreen = require("./GoalsScreen");
var StatisticsScreen = require("./StatisticsScreen");
var RemindersScreen = require("./RemindersScreen");
var InformationScreen = require("./InformationScreen");

const Tab = createBottomTabNavigator();

function TabScreen() {
	const navigation = useNavigation();
	const handleLogOut = () => {
		Alert.alert('Log Out', 'Are you sure you want to log out?', [
			{
			  text: 'Cancel',
			  onPress: () => console.log('Log out cancelled'),
			  style: 'cancel',
			},
			{text: 'Yes', onPress: () => navigation.navigate("Login")},
		]);
	}

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Scanner") {
						iconName = "camera";
					} else if (route.name === "Goals") {
						iconName = "checkbox";
					} else if (route.name === "Statistics") {
						iconName = "analytics";
					} else if (route.name === "Reminders") {
						iconName = "alarm";
                    } else if (route.name === "Information") {
						iconName = "document-text";
                    }

					// You can return any component that you like here!
					return (
						<Ionicons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "#FFFFFF",
				tabBarActiveBackgroundColor: "#73C0FF",
				tabBarInactiveBackgroundColor: "#73D1FF",
				headerStyle: {backgroundColor: '#CCEFFD'}, 
				headerRight: () => (
					<View style={{alignContent: "flex-end"}}>
						<TouchableOpacity style={{marginRight: 15}}>
							<Ionicons name={"log-out-outline"} size={30} color={"black"} onPress={handleLogOut}/>
						</TouchableOpacity>
					</View>
				),
				tabBarShowLabel: true,
			})}
		>
			<Tab.Screen name="Scanner" component={ScannerScreen} />
			<Tab.Screen name="Information" component={InformationScreen} />
			<Tab.Screen name="Goals" component={GoalsScreen} />
			<Tab.Screen name="Reminders" component={RemindersScreen} />
			<Tab.Screen name="Statistics" component={StatisticsScreen} />
		</Tab.Navigator>
	);
}

module.exports = TabScreen