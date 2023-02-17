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
import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import "../GlobalVars"
import { SortByProperty } from "../functions/SortByProperty";
import {mainStyles, colorMap} from "../Styles";

var editGoalId = null    // indicates id of goal when editing goals, if null then it is an add operation
const GOAL_STORAGE_KEY = "goal_storage_key" //used for local storage

class Goal {
  constructor(goalName) {
    this.completed = false;
    this.createdAt = new Date();
    this.goalDesc = null;
    this.goalName = goalName;
    this.id = null;
    this.targetDate = null;
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

    const getGoalByID = (goalId) => {
      let result = GoalList.find(obj => {
        return obj.id === goalId
      })
      return result
    }

    const handleGetGoals = async () => {
      try {
          console.log(`http://${DEVICE_IP}:3000/api/goals?userId=${USER_ID}`)
          fetch(`http://${DEVICE_IP}:3000/api/goals?userId=${USER_ID}`)
          .then(response => response.json())
          .then(goalsJSON => {
            console.log(goalsJSON)
            var sortedList = SortByProperty(goalsList, sortProperty)
            setGoals(sortedList)
          })
      } catch (error) {
          console.error(error)
      }
    }

    const handleAddGoal = async () => {
      var messageBody = JSON.stringify({
        goalName: goal.goalName,
        goalDesc: goal.goalDesc,
        targetDate: goal.targetDate,
        userId: USER_ID
      })
      console.log("body: ", messageBody)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: messageBody
            }
        )
        const json = await response.json()
        console.log(json)
      } catch (error) {
        console.error(error)
      }
    }

    const handleUpdateGoal = async () => {
      var updatedGoal = getGoalByID(editGoalId)
      updatedGoal.goalDesc = goal.goalDesc
      updatedGoal.goalName = goal.goalName
      var messageBody = JSON.stringify({
        completed : getGoalByID(editGoalId).completed,
        createdAt : getGoalByID(editGoalId).createdAt,
        goalDesc : goal.goalDesc,
        goalName : goal.goalName,
        id : getGoalByID(editGoalId).id,
        targetDate : goal.targetDate,
        updatedAt : getGoalByID(editGoalId).updatedAt,
        userId : getGoalByID(editGoalId).userId
      })
      console.log("body: ", messageBody)
      console.log(`http://${DEVICE_IP}:3000/api/goals/` + editGoalId)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + editGoalId,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedGoal)
            }
        )
        const text = await response.text()
        console.log(text)
      } catch (error) {
        console.error(error)
      }
    }

    React.useEffect(() => {
      console.log("effect")
      handleGetGoals()
    }, [sortProperty, isGoalModalVisible])

    const handleCancel = () => {
      setGoal(new Goal("New Goal"))
      editGoalId = null
      toggleGoalModal()
    }

    const handleGoalModalSubmit = () => {
      // If editGoalId is null, do add operation, otherwise do edit operation
      console.log("editGoalId: ", editGoalId)
      if (editGoalId === null) {
        console.log("add")
        handleAddGoal().then(handleGetGoals())
      } else {
        console.log("edit: ", editGoalId)
        handleUpdateGoal().then(handleGetGoals())
        editGoalId = null
      }
      
      toggleGoalModal();
    };

    const handleEditGoal = (goalId) => {
      editGoalId = goalId
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
        <View style={styles.GoalModal}>
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
                onChangeText={(val) => {
                  setGoal({...goal, goalName: val})
                  console.log("Goal name: ", goal.goalName)
                }}
              />
                <Text style={styles.formFieldText}>Goal Description</Text>
              <TextInput
                multiline={true}
                style={styles.textInput}
                placeholder="Enter Goal Description"
                onChangeText={(val) => {
                  setGoal({...goal, goalDesc: val})
                  console.log("Goal description: ", goal.goalDesc)
                }}
              />

              <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}
                style={styles.dateButton}>
                <Text style={styles.bigText}>
                  {goal.targetDate === null
                  ? "Choose a Date"
                  : goal.targetDate.toString()}
                </Text>
              </TouchableOpacity>

              {isDatePickerVisible && <DateTimePicker
                style={{width: '80%', height: 50}}
                mode="date"
                value={new Date()}
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                  if (event.type == "set") {
                    setGoal({...goal, targetDate:date})
                    console.log("Goal target date: ", goal.targetDate)
                  }
                  setIsDatePickerVisible(false);
                }}
              />}
              

            </View>
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
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {<TouchableOpacity
        onPress={handleGetGoals}
        style={styles.newGoalButton}
      >
        <View style={{ flex: 1 }}>
          <Ionicons name={"refresh"} size={26} color={"black"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bigText}>Refresh</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </TouchableOpacity>
      /* 
      <TouchableOpacity
        onPress={handleLoadGoals}
        style={styles.newGoalButton}
      >
        <View style={{ flex: 1 }}>
          <Ionicons name={"cloud-download-outline"} size={26} color={"black"} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.bigText}>Download Goals</Text>
        </View>
        <View style={{ flex: 1 }}/>
        
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={toggleGoalModal}
        style={styles.newGoalButton}
      >
        <View style={{ flex: 1 }}>
          <Ionicons name={"add-circle-outline"} size={26} color={"black"} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.bigText}>Add New Goal</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", alignItems: "center", width:"95%"}}>
        <View style={{flex: 2}}>
            <Text style={styles.bigText}>Sort By: </Text>
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("goalName")}>
            <Text>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("goalDesc")}>
            <Text>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("createdAt")}>
            <Text>Creation Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setSortProperty("targetDate")}>
            <Text>Target Date</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.goalScroll}>
        <View>
          {GoalList.map((goal, index) => {
            return (
              <View key={goal.id} style={styles.goal}>
                <Text style={{ alignSelf: "flex-start", fontSize: 20 }}>
                  {goal.goalName}
                </Text>
                <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
                  {goal.goalDesc}
                </Text>
                <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
                  Created On: {goal.createdAt}
                </Text>
                {/* <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
                  Target Date: {goal.targetDate}
                </Text> */}
                <View style={{ flexDirection: "row", marginTop: 10}}>
                  <TouchableOpacity style={{ marginHorizontal: 50 }}>
                    <Text style={{fontWeight:"bold"}} onPress={() => handleEditGoal(goal.id)}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: 50 }}>
                    <Text style={{fontWeight:"bold"}} onPress={() => handleDeleteGoal(goal.id)}>Delete</Text>
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
  goal: {
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
  goalScroll: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  newGoalButton: {
    flexDirection: "row",
    width: "94%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "center",
    backgroundColor: "#A0FF88",
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
    width: "50%",
    height: "20%",
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
    color: "black",
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
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    margin: 5,
    borderRadius: 10,
  },
  textInput: {
    borderColor: "gray",
    height: 50,
    padding: 8,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
    marginBottom: 30,
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
