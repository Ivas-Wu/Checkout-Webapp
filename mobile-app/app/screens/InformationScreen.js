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
import { SortByProperty } from "../functions/SortByProperty";

class Receipt {
    constructor() {
        this.id = null;
        this.store = null;
        this.category = null;
        this.date = null;
        this.total = null;
        this.createdAt = new Date();
        this.updatedAt = null;
        this.userId = USER_ID;
    }
}

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
        console.log(receipt)
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
        <View style={styles.pageBackground}>
            <Modal visible={isModalVisible} animationType="fade">
                <View style={styles.Modal}>
                    <Text style={styles.bigText}>Store</Text>
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

                    <Text style={styles.bigText}>Category</Text>
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

                    <Text style={styles.bigText}>Date</Text>
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

                    <Text style={styles.bigText}>Amount</Text>
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

                    <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.modalButton}
                    >
                    <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={handleModalSubmit}
                    style={styles.modalButton}
                    >
                    <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={handleGetReceipts}
                style={styles.wideButton}>
                <View style={{ flex: 1 }}>
                    <Ionicons name={"refresh"} size={26} color={"black"} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.bigText}>Refresh</Text>
                </View>
                <View style={{ flex: 1 }}/>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", alignItems: "center", width:"93%"}}>
                <View style={{flex: 2}}>
                    <Text style={styles.bigText}>Sort By: </Text>
                </View>
                <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("store")}>
                    <Text>Store</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("total")}>
                    <Text>Amount</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("category")}>
                    <Text>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("date")}>
                    <Text>Date</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll}>
                <View>
                {receiptList.map((receipt, index) => {
                    return (
                    <View key={receipt.id} style={styles.receipt}>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
                            Store: {receipt.store}{"\n"}
                            Amount: ${parseFloat(receipt.total).toFixed(2)}{"\n"}
                            Category: {receipt.category}{"\n"}
                            Date: {new Date(receipt.date).toLocaleDateString()}
                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 10}}>
                            <TouchableOpacity style={{ marginHorizontal: 50 }}>
                                <Text style={{fontWeight:"bold"}} onPress={() => {
                                    receiptId = receipt.id
                                    setReceipt(getReceiptById(receipt.id))
                                    toggleModal()
                                }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 50 }}>
                                <Text style={{fontWeight:"bold"}} onPress={() => {
                                    handleDeleteReceipt(receipt.id)
                                    receiptId = null
                                }}>Delete</Text>
                            </TouchableOpacity>
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
      backgroundColor: "lightblue",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
    pageBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
      backgroundColor: "lightblue",
    },
    smallButton: {
      flexDirection: "row",
      width: "47%",
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      justifyContent: "center",
      backgroundColor: "lightblue",
    },
    bigText: {
      fontSize: 20,
      fontFamily: "Roboto",
      fontWeight: "bold",
      textAlign: 'center',
    },
    Modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalButton: {
      width: "80%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lightblue",
      margin: 5,
      borderRadius: 10,
    },
    sortButton: {
        flex: 2,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
        margin: 2,
        borderRadius: 10,
    },
    textInput: {
      borderColor: "gray",
      width: "80%",
      height: 50,
      padding: 8,
      margin: 10,
      borderWidth: 1,
    },
  });

module.exports = InformationScreen