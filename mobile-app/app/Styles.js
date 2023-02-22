import { StyleSheet } from "react-native";
const colorMap = {
    // Just for reference, haven't figured out how to pass these to stylesheet
    lightblue: "#73D1FF",
	darkblue: "#73C0FF",
}

const mainStyles = StyleSheet.create({
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#E7F8FF"
    },
    bigText: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: 'center',
        color: '#FFFFFF'
    },
});

module.exports = mainStyles, colorMap