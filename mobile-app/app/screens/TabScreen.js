import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

var ScannerScreen = require("./ScannerScreen");
var GoalsScreen = require("./GoalsScreen");
var StatisticsScreen = require("./StatisticsScreen");
var SettingsScreen = require("./SettingsScreen");

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
						iconName = "trending-up";
					} else if (route.name === "Settings") {
						iconName = "settings-sharp";
                    }

					// You can return any component that you like here!
					return (
						<Ionicons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: "steelblue",
				tabBarInactiveTintColor: "lightslategray",
			})}
		>
			<Tab.Screen name="Scanner" component={ScannerScreen} />
			<Tab.Screen name="Goals" component={GoalsScreen} />
			<Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

module.exports = TabScreen