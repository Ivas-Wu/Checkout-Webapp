import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import * as ImagePicker from 'expo-image-picker';
import "../GlobalVars"
import {Receipt, Item} from "../GlobalVars";
import mainStyles from "../Styles";
import { LinearGradient } from 'expo-linear-gradient'
import { Buffer } from "buffer";
import {Picker} from '@react-native-picker/picker';

function ScannerScreen() {
    const [photo, setPhoto] = React.useState({uri: '1'})
    const [scanData, setScanData] = React.useState({items:[],receipt:[]})
    const [update, setUpdate] = React.useState(false)
    const [showLoading, setShowLoading] = React.useState(false)

    React.useEffect(() => {
        if (photo !== null){
            console.log("effect photopath:", photo.uri)
            handleGetScanData()
        }
    }, [photo, update])

    React.useEffect(() => {
        console.log("useEffect")
    }, [scanData])

    const handleGetScanData = async () => {
        console.log("scan receipt")

        const uploadPhoto = {
            uri: photo.uri,
            name: 'file',
            type: 'image/jpeg',
        }

        Image.getSize(photo.uri, (width, height) => {
            if (width === 0 || height === 0) {
                console.log("Invalid image data");
                return;
            } else {
                console.log("width, height: ", width, height)
            }
        });

        var formData = new FormData();
        formData.append("file", uploadPhoto)
        console.log(formData)

        try {
            setShowLoading(true)
            const response = await fetch(
                `http://${DEVICE_IP}:3000/api/scanner?userId=${USER_ID}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                }
            )
            const json = await response.json()
            console.log("result: ", json)
            setScanData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setShowLoading(false)
        }
    }

    const handleEditReceiptText = (value, field) => {
        var tempReceipt = scanData["receipt"]
        tempReceipt[field] = value
        setScanData({...scanData, receipt: tempReceipt})
        console.log(scanData)
    }

    const handleEditItemText = (value, index, field) => {
        var tempItems = scanData["items"]
        tempItems[index][field] = value
        setScanData({...scanData, items: tempItems})
        console.log(scanData)
    }

    const handleUploadScanData = async () => {
        
        // Create new Receipt Object
        var tempReceipt = new Receipt()
        for (var field in scanData.receipt) tempReceipt[field] = scanData.receipt[field]
        tempReceipt.date = new Date()
        if (tempReceipt.category == 'mock') {
            tempReceipt.category = "Other"
        }

        if (tempReceipt.store === null || tempReceipt.total === null) {
            Alert.alert('Missing Fields', 'Please check that the receipt contains all necessary information.', 
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    }
                ]);
            return
        }

        // POST receipt and get generated receiptId
        var receiptId = null
        console.log("tempReceipt: " , tempReceipt)
        try {
            const response = await fetch(
                `http://${DEVICE_IP}:3000/api/receipts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tempReceipt)
                }
            )
            const json = await response.json()
            console.log("receipt result: ", json)
            receiptId = json.id
        } catch (error) {
            console.error(error)
        }

        var id = receiptId
        // Create new Objects
        for (var i=0; i<scanData.items.length; i++) {
            var scanItem = scanData.items[i]
            var tempItem = new Item()

            for (var field in scanItem) tempItem[field] = scanItem[field]
            if (tempItem.category = "mock") {
                tempItem.category = "Other"
            }
            tempItem.receiptId = id
            console.log("receipt id: ", id)

            try {
                const response = await fetch(
                    `http://${DEVICE_IP}:3000/api/items`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tempItem)
                    }
                )
                const json = await response.json()
                console.log("item result: ", json)
                receiptId = json.id
            } catch (error) {
                console.error(error)
            }
        }

        Alert.alert('Receipt Uploaded', 'Your receipt was successfully uploaded!\n\nYou can see your past receipts on the information page.', [
            {
              text: 'Ok',
              style: 'cancel',
            }
        ]);
        return
    }

    const pickImage = async () => {
        setScanData({items:[],receipt:[]})

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            //base64: true,
        });

        if (result.assets !== null) {
            setPhoto(result.assets[0])
        } else {
            //setShowLoading(false)
        }
    };

    return (
        <KeyboardAvoidingView style={mainStyles.pageBackground}>
            <View flexDirection="column" style={{width: "93%", height: "25%", alignContent: "flex-end", alignSelf: "center"}}>
                <TouchableOpacity
                    onPress={() => {
                        setUpdate(!update)
                        console.log("update:", update)
                    }}
                    style={styles.button}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.buttonText}>Refresh</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setShowLoading(true)
                    pickImage()
                }}>
                    <View flexDirection="row">
                        <ActivityIndicator size="large" color={'white'} style={{flex:1}} animating={showLoading}/>
                        <View style={{flex:1}}></View>
                        <Text style={styles.buttonText}>Choose Receipt Image</Text>
                    </View>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleUploadScanData()
                }}>
                    <Text style={styles.buttonText}>Confirm Data and Upload</Text>
                </TouchableOpacity>

            </View>
            
            <ScrollView style={styles.scroll}>
                <View>
                    <LinearGradient
                        colors={['#73D1FF', '#73C0FF']}
                        style={styles.receipt}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.itemText}>Store</Text>
                        <TextInput multiline={true} style={styles.textInput} defaultValue={scanData["receipt"]["store"]} 
                        onChangeText={(val) => {handleEditReceiptText(val, "store")}}/>

                        <Text style={styles.itemText}>Total Amount</Text>
                        <TextInput multiline={true} style={styles.textInput} defaultValue={scanData["receipt"]["total"]} 
                        onChangeText={(val) => {handleEditReceiptText(val, "total")}}/>

                        <Text style={styles.itemText}>Receipt Category</Text>
                        <View style={{height: "25%", width:"100%", backgroundColor:"#E7F8FF", borderRadius:20, marginTop: 10}}>
                            <Picker
                                dropdownIconColor={"black"}
                                style={{flex: 1}}
                                selectedValue={scanData.receipt.category}
                                onValueChange={(itemValue, itemIndex) => {
                                    handleEditReceiptText(itemValue, "category")
                                } 
                            }>
                                <Picker.Item color='black' label="Choose a Category" value="mock" />
                                <Picker.Item color='black' label="Groceries" value="Groceries" />
                                <Picker.Item color='black' label="Entertainment" value="Entertainment" />
                                <Picker.Item color='black' label="Transportation" value="Transportation" />
                                <Picker.Item color='black' label="Housing" value="Housing" />
                                <Picker.Item color='black' label="Utilities" value="Utilities" />
                                <Picker.Item color='black' label="Other" value="Other" />
                            </Picker>
                        </View>
                    </LinearGradient>
                
                    {scanData["items"].map((item, index) => {
                        return (
                        <LinearGradient 
                            key={index} 
                            style={styles.item}
                            colors={['#73D1FF', '#73C0FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.5, y: 0.8 }}
                        >
                            
                            <View style={{width: "100%",alignContent: "center", alignItems: "center"}} flexDirection="row">
                                <Text style={styles.itemText}>Item Name</Text>
                                <TextInput multiline={true} style={styles.shortTextInput} defaultValue={item["productName"]} 
                                onChangeText={(val) => {handleEditItemText(val, index, "productName")}}/>

                                <Text style={styles.itemText}>Price</Text>
                                <TextInput multiline={true} style={{...styles.shortTextInput, flex: 1}} defaultValue={item["price"]}
                                onChangeText={(val) => {handleEditItemText(val, index, "price")}}/>  
                            </View>                             
                                
                            <Text style={styles.itemTextLeft}>Category</Text>
                            <View style={{height: "50%", width:"100%", backgroundColor:"#E7F8FF", borderRadius:20, marginTop: 10}}>
                                <Picker
                                    dropdownIconColor={"black"}
                                    style={{flex: 1}}
                                    selectedValue={item.category}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleEditItemText(itemValue, index, "category")
                                    } 
                                }>
                                    <Picker.Item color='black' label="Choose a Category" value="mock" />
                                    <Picker.Item color='black' label="Groceries" value="Groceries" />
                                    <Picker.Item color='black' label="Entertainment" value="Entertainment" />
                                    <Picker.Item color='black' label="Transportation" value="Transportation" />
                                    <Picker.Item color='black' label="Housing" value="Housing" />
                                    <Picker.Item color='black' label="Utilities" value="Utilities" />
                                    <Picker.Item color='black' label="Other" value="Other" />
                                </Picker>
                            </View>
                        </LinearGradient>
                        );
                    })}
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#73C0FF",
        padding: 10,
        borderRadius: 10,
        margin: 3,
        flex: 1,
    },
    item: {
        flex: 1,
        //backgroundColor: "#73D1FF",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        margin: 5,
      },
    textInput: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        width: "100%",
        height: 40,
        padding: 8,
        margin: 5,
        color: '#FFFFFF',
    },
    shortTextInput: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        marginRight: 10,
        textAlignVertical: "center",
        flex: 2,
        height: 30,
        paddingHorizontal: 8,
        margin: 5,
        color: '#FFFFFF',
    },
    scroll: {
        height:"50%",
        width: "100%",
        padding: 10,
        borderRadius: 10,
    },
    itemText: {
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: "bold",
        alignSelf: "center",
        color: '#FFFFFF',
        alignContent: "center"
    },
    itemTextLeft: {
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: '#FFFFFF',
        alignContent: "center"
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        alignSelf: "center",
        color: '#FFFFFF',
        flex: 8
    },
    smallButtonText: {
        fontSize: 15,
        fontFamily: "Roboto",
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        color: '#FFFFFF'
    },
    receipt: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
});

module.exports = ScannerScreen