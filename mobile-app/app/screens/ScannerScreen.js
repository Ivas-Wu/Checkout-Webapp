import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import * as ImagePicker from 'expo-image-picker';
import "../GlobalVars"
import {Receipt, Item} from "../GlobalVars";

function ScannerScreen() {
    const [photoPath, setPhotoPath] = React.useState("a")
    const [scanData, setScanData] = React.useState({items:[],receipt:[]})

    const handleGetScanData = async () => {
        try {
            const response = await fetch(
                `http://${DEVICE_IP}:3000/api/scanner?userId=${USER_ID}`
            )
            const json = await response.json()
            setScanData(json)
            console.log(json)
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditReceiptText = (value, field) => {
        var tempReceipt = scanData["receipt"]
        tempReceipt[field] = value

        var tempData = scanData
        tempData["receipt"] = tempReceipt
        setScanData(tempData)
        //console.log(tempData)
    }

    const handleEditItemText = (value, index, field) => {
        var tempItems = scanData["items"]
        tempItems[index][field] = value

        var tempData = scanData
        tempData["items"] = tempItems
        setScanData(tempData)
        //console.log(tempData)
    }

    const handleUploadScanData = async () => {
        //console.log("body: ", scanData["receipt"])
        console.log(`http://${DEVICE_IP}:3000/api/receipts?userId=` + USER_ID)
        var body = scanData["receipt"]
        //console.log("body: ", body)
        var receiptId = null
        try {
          const response = await fetch(
              `http://${DEVICE_IP}:3000/api/receipts?userId=` + USER_ID,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              }
          )
          const json = await response.json()
          //console.log("json: ",json)
          receiptId = json["id"]
          //console.log("receiptId: ",receiptId)
        } catch (error) {
          console.error(error)
        }

        var itemList = scanData["items"]
        for (const item of itemList) {
            itemBody = item
            itemBody["receiptId"] = receiptId
            console.log("itembody: ",itemBody)

            /* try {
                const response = await fetch(
                    `http://${DEVICE_IP}:3000/api/items?userId=` + USER_ID,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(itemBody)
                    }
                )
                const json = await response.json()
                console.log("item json: ",json)
            } catch (error) {
                console.error(error)
            } */
        }
    }

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
            <View style={{ flexDirection: "row"}}>
                <TouchableOpacity style={styles.button} onPress={handleGetScanData}>
                    <Text>Get Scan Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleUploadScanData}>
                    <Text>Confirm Data and Upload</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.receipt}>
                <Text style={styles.itemText}>Store</Text>
                <TextInput multiline={true} style={styles.textInput} defaultValue={scanData["receipt"]["store"]} 
                onChangeText={(val) => {handleEditReceiptText(val, "store")}}/>

                <Text style={styles.itemText}>Receipt Category</Text>
                <TextInput multiline={true} style={styles.textInput} defaultValue={scanData["receipt"]["category"]} 
                onChangeText={(val) => {handleEditReceiptText(val, "store")}}/>

                <Text style={styles.itemText}>Total Amount</Text>
                <TextInput multiline={true} style={styles.textInput} defaultValue={scanData["receipt"]["total"]} 
                onChangeText={(val) => {handleEditReceiptText(val, "store")}}/>
            </View>

            <View style={{height:"50%", width: "100%"}}>
            <ScrollView style={styles.scroll}>
                <View>
                {scanData["items"].map((item, index) => {
                    return (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemText}>Item Name</Text>
                        <TextInput multiline={true} style={styles.textInput} defaultValue={item["productName"]} 
                        onChangeText={(val) => {handleEditItemText(val, index, "productName")}}/>
                        
                        <Text style={styles.itemText}>Category</Text>
                        <TextInput multiline={true} style={styles.textInput} defaultValue={item["category"]}
                        onChangeText={(val) => {handleEditItemText(val, index, "category")}}/>  
                        
                        <Text style={styles.itemText}>Price</Text>
                        <TextInput multiline={true} style={styles.textInput} defaultValue={item["price"]}
                        onChangeText={(val) => {handleEditItemText(val, index, "price")}}/>  
                    </View>
                    );
                })}
                </View>
            </ScrollView>
            </View>
        </View>
        //{photoPath && <Image source={{ uri: photoPath }} style={{ width: 300, height: 400}} />}
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
        margin: 5
    },
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
    },
    item: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        margin: 5,
      },
    textInput: {
        borderColor: "gray",
        width: "100%",
        height: 40,
        padding: 8,
        margin: 5,
        borderWidth: 1,
    },
    scroll: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
    receipt: {
        width: "93%",
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
});

module.exports = ScannerScreen