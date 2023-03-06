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
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import "../GlobalVars"
import { SortByProperty } from "../functions/SortByProperty";
import {mainStyles, colorMap} from "../Styles";
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient'
import moment from "moment";

const GOAL_STORAGE_KEY = "goal_storage_key" //used for local storage

class Goal {
  constructor(goalName) {
    this.completed = false;
    this.createdAt = new Date();
    this.goalDesc = null;
    this.goalName = goalName;
    this.id = null;
    this.targetDate = new Date();
    this.updatedAt = null;
    this.userId = USER_ID;
  }
}

function GoalsScreen() {
    const [isGoalModalVisible, setIsGoalModalVisible] =
        React.useState(false);
    const toggleGoalModal = () =>
        setIsGoalModalVisible(() => !isGoalModalVisible);
    const [goal, setGoal] = React.useState(new Goal("New Goal"))
    const [GoalList, setGoals] = React.useState([]);
    const [sortProperty, setSortProperty] = React.useState("createdAt")
    const [isDatePickerVisible, setIsDatePickerVisible] =
        React.useState(false);
    const dateFormat = global.DATE_FORMAT

    const handleGetGoals = async () => {
      try {
          //console.log(`http://${DEVICE_IP}:3000/api/goals?userId=${USER_ID}`)
          fetch(`http://${DEVICE_IP}:3000/api/goals?userId=${USER_ID}`)
          .then(response => response.json())
          .then(goalsJSON => {
            var sortedList = SortByProperty(goalsJSON, sortProperty)
            //console.log(sortedList)
            setGoals(sortedList)
          })
      } catch (error) {
          console.error(error)
      }
    }

    const handleAddGoal = async () => {
      console.log("add goal: ", goal)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(goal)
            }
        )
        const json = await response.json()
        console.log("add result: ", json)
      } catch (error) {
        console.error(error)
      }
      //handleGetGoals()
    }

    const handleUpdateGoal = async () => {
      console.log("edit goal: ", goal)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + goal.id,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(goal)
            }
        )
        const text = await response.text()
        console.log("update result: " , text)
      } catch (error) {
        console.error(error)
      }
    }

    React.useEffect(() => {
      //console.log("effect")
      handleGetGoals()
    }, [sortProperty, isGoalModalVisible])

    const handleCancel = () => {
      setGoal(null)
      toggleGoalModal()
    }

    const handleGoalModalSubmit = () => {
      if (!moment(goal.targetDate, dateFormat).utc().isValid()) {
        Alert.alert('Invalid Date', 'Please check that the date you have entered is in the correct format.', [
          {
            text: 'Ok',
            style: 'cancel',
          }
        ]);

        return
      }

      if (goal.id === null) {
        console.log("add")
        handleAddGoal().then(handleGetGoals())
        setGoal(null)
      } else {
        console.log("edit: ", goal.id)
        handleUpdateGoal().then(handleGetGoals())
        setGoal(null)
      }
      
      toggleGoalModal();
    };

    const handleEditGoal = (goalId) => {
      let tempGoal = null
      for (var i=0; i<GoalList.length; i++) {
        if (GoalList[i].id == goalId) {
          tempGoal = GoalList[i]
          break
        }
      }
      setGoal(tempGoal)
      toggleGoalModal();
    }

    const handleDeleteGoal = async (goalId) => {

      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + goalId, {method: 'DELETE'}
        )
        const json = await response.json()
        console.log(json)
        handleGetGoals()
      } catch (error) {
          console.error(error)
      }
    };

    const handleToggleGoalCheckbox = async (goal) => {
      goal.completed = !goal.completed
      console.log(goal.completed)
      console.log(`http://${DEVICE_IP}:3000/api/goals/` + goal.id)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + goal.id,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(goal)
            }
        )
        const text = await response.text()
        console.log(text)
      } catch (error) {
        console.error(error)
      }
      handleGetGoals()
    }

/*
    const handleSaveGoals = async () => {
      await AsyncStorage.setItem(GOAL_STORAGE_KEY,JSON.stringify(GoalList))
    }
    
    const handleLoadGoals = async () => {

      let result = await AsyncStorage.getItem(GOAL_STORAGE_KEY)
      if (result === null) {
        console.log("no data found")
        setGoals([])
      } else {
        setGoals(JSON.parse(result))
      }
    };
*/

  return (
    <View style={styles.pageBackground}>
      <Modal visible={isGoalModalVisible} animationType="fade">
        <LinearGradient
          colors={['#73D1FF', '#73C0FF']}
          style={styles.GoalModal}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.7, y: 1 }}
        >
          <KeyboardAvoidingView
            behaviour="position"
            style={{
              height: "50%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{width:"100%", alignItems:"center"}}>
              <Text style={styles.formFieldText}>Goal Name</Text>
              <TextInput
                multiline={true}
                style={styles.textInput}
                placeholder="Enter Goal Name"
                defaultValue={goal === null ? "" : goal.goalName}
                onChangeText={(val) => {
                  setGoal({...goal, goalName: val})
                  //console.log("Goal name: ", goal.goalName)
                }}
              />
                <Text style={styles.formFieldText}>Goal Description</Text>
              <TextInput
                multiline={true}
                style={styles.textInput}
                placeholder="Enter Goal Description"
                defaultValue={goal === null ? "" : goal.goalDesc}
                onChangeText={(val) => {
                  setGoal({...goal, goalDesc: val})
                  //console.log("Goal description: ", goal.goalDesc)
                }}
              />

              <Text style={styles.formFieldText}>Date ({dateFormat})</Text>
              <TextInput
                multiline={false}
                style={styles.textInput}
                placeholder={dateFormat}
                //defaultValue={goal === null ? "" : moment(goal.targetDate).format(dateFormat)}
                onChangeText={(val) => {
                  setGoal({...goal, targetDate: moment(val, dateFormat)})
                }}
              />

              {/* <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}
                style={styles.dateButton}>
                <Text style={styles.bigTextDark}>
                  {goal === null || goal.targetDate === null
                  ? "Choose a Date"
                  : new Date(goal.targetDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {isDatePickerVisible && <DateTimePicker
                style={{width: '80%', height: '30%'}}
                mode="date"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  if (event.type == "set") {
                    setGoal({...goal, targetDate: new Date(date)})
                  }
                  //console.log(goal.date)
                  setIsDatePickerVisible(false);
                }}
              />} */}

            </View>
            <View style={{flexDirection: 'row', width: '80%'}}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.modalButton}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleGoalModalSubmit}
                style={styles.modalButton}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </Modal>

      <TouchableOpacity
        onPress={handleGetGoals}
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
          setGoal(new Goal("New Goal"))
          toggleGoalModal()
        }}
        style={styles.wideButton}
      >
        <View style={{ flex: 1 }}>
          <Ionicons name={"add-circle-outline"} size={26} color={"white"} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.bigText}>Add New Goal</Text>
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
                onValueChange={(itemValue, itemIndex) =>
                    setSortProperty(itemValue)
                }>
                <Picker.Item label="Name" value="goalName" />
                <Picker.Item label="Description" value="goalDesc" />
                <Picker.Item label="Creation Date" value="createdAt" />
                <Picker.Item label="Target Date" value="targetDate" />
            </Picker>
        </View>
    </View>

      <ScrollView style={styles.goalScroll}>
        <View>
          {GoalList.map((goal, index) => {
            return (
              <LinearGradient key={goal.id} style={styles.goal}
                  colors={['#418CD6', '#73C0FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.5, y: 0.8 }}
              >
                <View style={{flex: 8}}>
                  <Text style={{ alignSelf: "flex-start", fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                    {goal.goalName}
                  </Text>
                  <Text style={{ alignSelf: "flex-start", fontSize: 15, color: 'white' }}>
                    Description: {goal.goalDesc + "\n"}
                    Created On: {goal.createdAt === null ? "" : moment(goal.createdAt).utc().format(global.DATE_DISPLAY_FORMAT) + "\n"}
                    Target Date: {goal.targetDate === null ? "" : moment(goal.targetDate).utc().format(global.DATE_DISPLAY_FORMAT) + "\n"}
                  </Text>
                </View>
                  
                <View style={{ flexDirection: "column", marginTop: 10, flex:1}}>
                  <TouchableOpacity style={{ flex: 1, marginBottom: 5 }}>
                    <Ionicons name={goal.completed ? "checkbox-outline" : "square-outline"} size={26} color={"white"} onPress={() => {
                        handleToggleGoalCheckbox(goal)
                    }}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, marginBottom: 5 }}>
                    <Ionicons name={"create-outline"} size={26} color={"white"} onPress={() => {
                        handleEditGoal(goal.id)
                    }}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, marginBottom: 5 }}>
                    <Ionicons name={"trash-outline"} size={26} color={"white"} onPress={() => {
                        handleDeleteGoal(goal.id)
                    }}/>
                  </TouchableOpacity>
                </View>
                
              </LinearGradient>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  goal: {
    flex: 1,
    //backgroundColor: "#B1E8FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 5,
    //borderColor: "#73D1FF",
    //borderWidth: 2,
  },
  pageBackground: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#E7F8FF"
  },
  goalScroll: {
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
    backgroundColor: "#73C0FF",
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
  dateButton: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    backgroundColor: 'white'
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
  GoalModal: {
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
  sortButton: {
    flex: 2,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    margin: 2,
    borderRadius: 10,
},
});

module.exports = GoalsScreen;
