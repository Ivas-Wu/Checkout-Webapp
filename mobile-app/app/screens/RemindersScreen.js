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
    Alert
} from "react-native";
import "../GlobalVars"
import { SortByProperty } from "../functions/SortByProperty";
import {mainStyles, colorMap} from "../Styles";
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";

class Reminder {
    constructor(name) {
        this.reminderName = name
        this.reminderDesc = null
        this.userId = USER_ID
        this.date = new Date()
        this.alertMe = false
        this.alertAt = null
        this.id = null
        this.createdAt = null
        this.updatedAt = null
    }
}

function RemindersScreen({navigation}) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const toggleModal = () => setIsModalVisible(() => !isModalVisible);
    const [reminder, setReminder] = React.useState(new Reminder("New Reminder"))
    const [reminderList, setReminderList] = React.useState([]);
    const dateFormat = global.DATE_FORMAT

    const handleGetReminders = async () => {
        try {
            fetch(`http://${DEVICE_IP}:3000/api/reminders?userId=${USER_ID}`)
            .then(response => response.json())
            .then(JSON => {
                var sortedList = SortByProperty(JSON, 'date')
                //console.log(sortedList)
                setReminderList(sortedList)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const apiRequest = async (endpoint, method, body) => {
        console.log("body: ", body)
        try {
            const response = await fetch(
                endpoint,
                {
                        method: method,
                        headers: {'Content-Type': 'application/json'},
                        body: body
                }
            )
            const json = await response.json()
            console.log("response:", json)
        } catch (error) {
            console.error(error)
        }
    }

    const handleModalSubmit = () => {
        console.log("submit reminder: ", reminder)
        if (!moment(reminder.date, dateFormat).utc().isValid()) {
            Alert.alert('Invalid Date', 'Please check that the date you have entered is in the correct format.', 
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                }
            ]);
    
            return
        }

        var endpoint = null
        var method = null
        var body = null
        console.log(reminder)
  
        if (reminder.id === null) {
            console.log("add")
            endpoint = `http://${DEVICE_IP}:3000/api/reminders`
            method = 'POST'
            body = JSON.stringify(reminder)
        } else {
            console.log("update id: ", reminder.id)
            endpoint = `http://${DEVICE_IP}:3000/api/reminders/` + reminder.id
            method = 'PUT'
            body = JSON.stringify(reminder)
        }

        apiRequest(endpoint, method, body).then(handleGetReminders)
        setReminder(new Reminder("New Reminder"))
        toggleModal();
    };

    React.useEffect(() => {
        handleGetReminders()
    }, [isModalVisible])

    const handleDeleteReminder = async (id) => {
        try {
            const response = await fetch(
                `http://${DEVICE_IP}:3000/api/reminders/` + id, {method: 'DELETE'}
            )
            const json = await response.json()
            console.log(json)
            handleGetReminders()
        } catch (error) {
            console.error(error)
        }
    };

    const handleCancel = () => {
        setReminder(new Reminder("New Reminder"))
        toggleModal()
    }
    
	return (
    <View style={styles.pageBackground}>
        <Modal visible={isModalVisible} animationType="fade">
            <LinearGradient
                colors={['#73D1FF', '#73C0FF']}
                style={styles.modal}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.7, y: 1 }}
            >
            <KeyboardAvoidingView behaviour="position" style={{height: "50%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                <View style={{width:"100%", alignItems:"center"}}>
                    <Text style={styles.formFieldText}>Reminder Name</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        placeholder="Enter Reminder Name"
                        defaultValue={reminder === null ? "" : reminder.reminderName}
                        onChangeText={(val) => {
                            setReminder({...reminder, reminderName: val})
                        }}
                    />

                    <Text style={styles.formFieldText}>Reminder Description</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        placeholder="Enter Reminder Description"
                        defaultValue={reminder === null ? "" : reminder.reminderDesc}
                        onChangeText={(val) => {
                            setReminder({...reminder, reminderDesc: val})
                            console.log(reminder)
                        }}
                    />

                    <Text style={styles.formFieldText}>Date ({dateFormat})</Text>
                    <TextInput
                        multiline={false}
                        style={styles.textInput}
                        placeholder={dateFormat}
                        onChangeText={(val) => {
                            setReminder({...reminder, date: moment(val, dateFormat)})
                        }}
                    />

                    <View flexDirection="row" style={{width: "80%", marginVertical: 20}}>
                        <TouchableOpacity style={{ flex: 1, marginRight: 10 }}>
                            <Ionicons name={reminder.alertMe == true ? "checkbox-outline" : "square-outline"} size={26} color={"black"} onPress={() => {
                                if (reminder.alertMe == false) {
                                    setReminder({...reminder, alertMe: true}), () => {
                                    }
                                } else {
                                    setReminder({...reminder, alertMe: false}), () => {
                                        setReminder({...reminder, alertAt: 0})
                                    }
                                }
                            }}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, fontFamily: "Roboto", fontWeight: "bold", textAlign: 'left', color: "black", flex: 5, marginLeft: 10}}> 
                            Remind Me 
                        </Text>
                        <TextInput style={styles.smallTextInput} editable={reminder.alertMe == true} defaultValue={reminder.alertAt} onChangeText={(val) => {
                            setReminder({...reminder, alertAt: val})
                        }}/>
                        <Text style={{fontSize: 20, fontFamily: "Roboto", fontWeight: "bold", textAlign: 'left', color: "black", flex: 5}}> 
                            Days Before
                        </Text>
                    </View>
                    
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
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
            </KeyboardAvoidingView>
            </LinearGradient>
        </Modal>

        <TouchableOpacity
            onPress={handleGetReminders}
            style={styles.wideButton}
        >
            <View style={{ flex: 1 }}>
                <Ionicons name={"refresh"} size={26} color={"white"} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.bigText}>Refresh</Text>
            </View>
            <View style={{ flex: 1 }}/>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
                setReminder(new Reminder("New Reminder"))
                toggleModal()
            }}
            style={styles.wideButton}
        >
            <View style={{ flex: 1 }}>
                <Ionicons name={"add-circle-outline"} size={26} color={"white"} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.bigText}>Add New Reminder</Text>
            </View>
            <View style={{ flex: 1 }}/>
        </TouchableOpacity>


        <ScrollView style={{width: "100%", padding: 10,borderRadius: 10,}}>
            {reminderList.map((reminder, index) => {
                return (
                <View key={reminder.id} style={styles.reminder}>
                    <View style={{flex: 8}}>
                        <Text style={{ alignSelf: "flex-start", fontSize: 20 }}>
                            {reminder.reminderName}
                        </Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
                            {reminder.reminderDesc + "\n"}
                            {reminder.date === null ? "" : moment(reminder.date).utc().format(global.DATE_DISPLAY_FORMAT) + "\n"}
                            Remind me: {reminder.alertAt} days before
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: "column", marginTop: 10, flex:1}}>
                        <TouchableOpacity style={{ flex: 1, marginBottom: 5 }}>
                            <Ionicons name={"create-outline"} size={26} color={"black"} onPress={() => {
                                setReminder(reminder)
                                toggleModal()
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, marginBottom: 5 }}>
                            <Ionicons name={"trash-outline"} size={26} color={"black"} onPress={() => {
                                handleDeleteReminder(reminder.id)
                            }}/>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                );
            })}
        </ScrollView>
    </View>
	)
}

const styles = StyleSheet.create({
    pageBackground: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#E7F8FF"
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
    formFieldText: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: 'left',
        color: "black",
    },
    modal: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
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
    smallTextInput: {
        borderColor: '#73C0FF',
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        height: 30,
        padding: 5,
        marginRight: 15,
        textAlignVertical: "center",
        borderWidth: 2,
    },
    reminder: {
        flex: 1,
        backgroundColor: "#B1E8FF",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        marginTop: 5,
        borderColor: "#73D1FF",
        borderWidth: 2,
      },
});

module.exports = RemindersScreen