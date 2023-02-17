import { StyleSheet } from "react-native";
const colorMap = {
    darkGreen: "#249000",
	lightGreen: "#28A200",
}

const mainStyles = StyleSheet.create({
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
});

module.exports = mainStyles, colorMap