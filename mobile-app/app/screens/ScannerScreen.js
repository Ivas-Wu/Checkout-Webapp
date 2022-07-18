import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import * as ImagePicker from 'expo-image-picker';

function ScannerScreen() {
    const [photoPath, setPhotoPath] = React.useState("a")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        console.log(result)
    
        if (!result.cancelled) {
            setPhotoPath(result.uri)
            console.log("photopath:", photoPath)
        }
    };

    return (
        <View style={styles.pageBackground}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text>Upload Image From Device</Text>
            </TouchableOpacity>
            {photoPath && <Image source={{ uri: photoPath }} style={{ width: 300, height: 400}} />}
        </View>
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
        backgroundColor: "lightblue",
        padding: 10,
        borderRadius: 10,
    },
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    }
});

module.exports = ScannerScreen