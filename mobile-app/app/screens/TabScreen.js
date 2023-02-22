import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import mainStyles from "../Styles";

var ScannerScreen = require("./ScannerScreen");
var GoalsScreen = require("./GoalsScreen");
var StatisticsScreen = require("./StatisticsScreen");
var SettingsScreen = require("./SettingsScreen");
var InformationScreen = require("./InformationScreen");

const Tab = createBottomTabNavigator();

function TabScreen() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Scanner") {
						iconName = "camera";
					} else if (route.name === "Goals") {
						iconName = "list";
					} else if (route.name === "Statistics") {
						iconName = "analytics-outline";
					} else if (route.name === "Settings") {
						iconName = "settings-sharp";
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
			})}
		>
			<Tab.Screen name="Scanner" component={ScannerScreen} />
			<Tab.Screen name="Information" component={InformationScreen} />
			<Tab.Screen name="Goals" component={GoalsScreen} />
			<Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

module.exports = TabScreen