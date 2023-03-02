import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import "../GlobalVars"
import { Receipt } from "../GlobalVars";
import { SortByProperty } from "../functions/SortByProperty";
import {Picker} from '@react-native-picker/picker';
import mainStyles from "../Styles";
import { LinearGradient } from 'expo-linear-gradient'

var receiptId = null;
function InformationScreen() {
    
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const toggleModal = () => setIsModalVisible(() => !isModalVisible);
    const [receipt, setReceipt] = React.useState(new Receipt())
    const [receiptList, setReceiptList] = React.useState([]);
    const [sortProperty, setSortProperty] = React.useState("date")

    const getReceiptById = (receiptId) => {
        let result = receiptList.find(obj => {
          return obj.id === receiptId
        })
        return result
    }

    const handleGetReceipts = async () => {
        try {
            const response = await fetch(
                `http://${DEVICE_IP}:3000/api/receipts?userId=${USER_ID}`
            )
            const json = await response.json()
            var receiptList = json
            var sortedList = SortByProperty(receiptList, sortProperty)
            setReceiptList(sortedList)
            //setReceiptList(receiptList)
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateReceipt = async () => {
        var updatedReceipt = getReceiptById(receiptId)
        //console.log(receipt)
        updatedReceipt.store = receipt.store
        updatedReceipt.category = receipt.category
        updatedReceipt.date = receipt.date
        updatedReceipt.total = receipt.total

        console.log("body: ", updatedReceipt)
        console.log(`http://${DEVICE_IP}:3000/api/receipts/` + receiptId)
        try {
          const response = await fetch(
              `http://${DEVICE_IP}:3000/api/receipts/` + receiptId,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedReceipt)
              }
          )
          const text = await response.text()
          console.log(text)
        } catch (error) {
          console.error(error)
        }
        handleGetReceipts()
    }

    const handleDeleteReceipt = async (receiptId) => {

        try {
          const response = await fetch(
              `http://${DEVICE_IP}:3000/api/receipts/` + receiptId, {method: 'DELETE'}
          )
          const json = await response.json()
          console.log(json)
          handleGetReceipts()
        } catch (error) {
            console.error(error)
        }
      };

    const handleCancel = () => {
        setReceipt(new Receipt())
        toggleModal()
    }

    const handleModalSubmit = () => {
        console.log("edit: ", receiptId)
        handleUpdateReceipt().then(handleGetReceipts())
        receiptId = null
        toggleModal();
    };

    React.useEffect(() => {
        console.log("receipt effect")
        handleGetReceipts()
    }, [sortProperty])

    return (
        <View style={mainStyles.pageBackground}>
            <Modal visible={isModalVisible} animationType="fade">
                <LinearGradient
                    colors={['#73D1FF', '#73C0FF']}
                    style={styles.Modal}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.7, y: 1 }}
                >
                    <Text style={styles.bigTextDark}>Store</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        defaultValue={receipt.store}
                        onChangeText={(val) => {
                            var temp = receipt
                            receipt.store = val
                            setReceipt(temp)
                        }}
                    />

                    <Text style={styles.bigTextDark}>Category</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        defaultValue={receipt.category}
                        onChangeText={(val) => {
                            var temp = receipt
                            receipt.category = val
                            setReceipt(temp)
                        }}
                    />

                    <Text style={styles.bigTextDark}>Date</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        defaultValue={receipt.date}
                        onChangeText={(val) => {
                            var temp = receipt
                            receipt.date = val
                            setReceipt(temp)
                        }}
                    />

                    <Text style={styles.bigTextDark}>Amount</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        defaultValue={receipt.total}
                        onChangeText={(val) => {
                            var temp = receipt
                            receipt.total = val
                            setReceipt(temp)
                        }}
                    />
                    <View flexDirection="row" style={{width: "80%"}}>
                        <TouchableOpacity
                        onPress={handleCancel}
                        style={styles.modalButton}
                        >
                            <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={handleModalSubmit}
                        style={styles.modalButton}
                        >
                            <Text style={{fontWeight: 'bold'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    
                </LinearGradient>
            </Modal>

            <TouchableOpacity
                onPress={handleGetReceipts}
                style={styles.wideButton}>
                <View style={{ flex: 1 }}>
                    <Ionicons name={"refresh"} size={26} color={"white"} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.bigText}>Refresh</Text>
                </View>
                <View style={{ flex: 1 }}/>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 5, justifyContent: "center", alignItems: "center", width:"93%"}}>
                <View style={{flex: 2}}>
                    <Text style={styles.bigTextDark}>Sort By: </Text>
                </View>
                <View style={{flex:6, height:"100%", backgroundColor:"white", borderRadius:20, borderColor: "#73D1FF", borderWidth: 2}}>
                    <Picker
                        selectedValue={sortProperty}
                        onValueChange={(itemValue, itemIndex) => {
                            setSortProperty(itemValue)
                            handleGetReceipts()
                        } 
                    }>
                        <Picker.Item label="Store" value="store" />
                        <Picker.Item label="Amount" value="total" />
                        <Picker.Item label="Category" value="category" />
                        <Picker.Item label="Date" value="date" />
                    </Picker>
                </View>
            </View>

            <ScrollView style={styles.scroll}>
                <View>
                {receiptList.map((receipt, index) => {
                    return (
                    <View key={receipt.id} style={styles.receipt}>
                        <View style={{ flexDirection: "row", marginTop: 5}}>
                            <Text style={{ alignSelf: "flex-start", fontSize: 15, flex: 8}}>
                                Store: {receipt.store}{"\n"}
                                Amount: ${parseFloat(receipt.total).toFixed(2)}{"\n"}
                                Category: {receipt.category}{"\n"}
                                Date: {new Date(receipt.date).toLocaleDateString()}
                            </Text>
                            <View style={{ flexDirection: "column", flex: 1}}>
                                <TouchableOpacity style={{ flex: 1, marginBottom: 5}}>
                                    <Ionicons name={"create-outline"} size={26} color={"black"} onPress={() => {
                                        receiptId = receipt.id
                                        setReceipt(getReceiptById(receipt.id))
                                        toggleModal()
                                    }}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Ionicons name={"trash-outline"} size={26} color={"black"} onPress={() => {
                                        handleDeleteReceipt(receipt.id)
                                        receiptId = null
                                    }}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    );
                })}
                </View>
            </ScrollView>
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
    receipt: {
      flex: 1,
      backgroundColor: "#B1E8FF",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      marginBottom: 5,
      borderColor: "#73D1FF",
      borderWidth: 2,
    },
    scroll: {
      width: "100%",
      padding: 10,
      borderRadius: 10,
    },
    wideButton: {
      flexDirection: "row",
      width: "94%",
      padding: 10,
      borderRadius: 10,
      marginTop: 5,
      justifyContent: "center",
      backgroundColor: "#73D1FF",
    },
    bigText: {
      fontSize: 20,
      fontFamily: "Roboto",
      fontWeight: "bold",
      textAlign: 'center',
      color: '#FFFFFF'
    },
    bigTextDark: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: 'center',
        color: 'black'
    },
    Modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalButton: {
      flex: 1,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      margin: 5,
      borderRadius: 10,
    },
    textInput: {
      borderColor: '#73C0FF',
      backgroundColor: 'white',
      borderRadius: 20,
      width: "80%",
      height: 50,
      padding: 8,
      margin: 10,
      borderWidth: 2,
    },
  });

module.exports = InformationScreen