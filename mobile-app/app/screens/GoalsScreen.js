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
import {DateTimePicker} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

const DEVICE_IP = "192.168.0.155"
var userId = 2
var editGoalIndex = null    // indicates index of goal when editing goals, if null then it is an add operation
const GOAL_STORAGE_KEY = "goal_storage_key"

class Goal {
  constructor(goalName) {
    this.completed = false;
    this.createdAt = new Date();
    this.goalDesc = null;
    this.goalName = goalName;
    this.id = null;
    this.targetDate = null;
    this.updatedAt = null;
    this.userId = userId;
  }
}

function GoalsScreen() {
    const [isGoalModalVisible, setIsGoalModalVisible] =
        React.useState(false);
    const toggleGoalModal = () =>
        setIsGoalModalVisible(() => !isGoalModalVisible);
    //const [goalName, setGoalName] = React.useState("New Goal");
    const [goal, setGoal] = React.useState(new Goal("New Goal"))
    const [GoalList, setGoals] = React.useState([]);

    const handleGetGoals = async () => {
      try {
          const response = await fetch(
              `http://${DEVICE_IP}:3000/api/goals?userId=${userId}`
          )
          const json = await response.json()
          var goalsList = json
          //console.log(goalsList)
          setGoals(goalsList)
      } catch (error) {
          console.error(error)
      }
    }

    const handleAddGoal = async () => {
      var messageBody = JSON.stringify({
        goalName: goal.goalName,
        goalDesc: goal.goalDesc,
        targetDate: goal.targetDate,
        userId: userId
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
      var messageBody = JSON.stringify({
        completed : GoalList[editGoalIndex].completed,
        createdAt : GoalList[editGoalIndex].createdAt,
        goalDesc : GoalList[editGoalIndex].goalDesc,
        goalName : goal.goalName,
        id : GoalList[editGoalIndex].id,
        targetDate : GoalList[editGoalIndex].targetDate,
        updatedAt : GoalList[editGoalIndex].updatedAt,
        userId : GoalList[editGoalIndex].userId
      })
      console.log("body: ", messageBody)
      console.log(`http://${DEVICE_IP}:3000/api/goals/` + GoalList[editGoalIndex].id)
      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + GoalList[editGoalIndex].id,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: messageBody
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
    }, [])

    const handleCancel = () => {
      setGoal(new Goal("New Goal"))
      editGoalIndex = null
      toggleGoalModal()
    }

    const handleGoalModalSubmit = () => {
      // If editGoalIndex is null, do add operation, otherwise do edit operation
      console.log("editGoalIndex: ", editGoalIndex)
      if (editGoalIndex === null) {
        console.log("add")
        handleAddGoal().then(handleGetGoals())
      } else {
        console.log("edit: ", editGoalIndex)
        handleUpdateGoal().then(handleGetGoals())
        /*let GoalListCopy = [...GoalList];
        GoalListCopy.splice(editGoalIndex, 1, goal)
        setGoals(GoalListCopy);
        editGoalIndex = null*/
      }
      
      toggleGoalModal();
    };

    const handleEditGoal = (index) => {
      editGoalIndex = index
      console.log("indexes: ", index, editGoalIndex)
      toggleGoalModal();
    }

    const handleDeleteGoal = async (index) => {

      try {
        const response = await fetch(
            `http://${DEVICE_IP}:3000/api/goals/` + GoalList[index].id, {method: 'DELETE'}
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
          <Text style={styles.bigText}>Goal Details</Text>
          <TextInput
            multiline={true}
            style={styles.textInput}
            placeholder="Enter Goal Name"
            onChangeText={(val) => {
              var tempGoal = goal
              tempGoal.goalName = val
              setGoal(tempGoal)
            }}
        />

        <View>
            <Button title="Show date picker!"/>
        </View>

          <KeyboardAvoidingView
            behaviour="position"
            style={{
              height: "50%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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

      <ScrollView style={styles.goalScroll}>
        <View>
          {GoalList.map((goal, index) => {
            return (
              <View key={index} style={styles.goal}>
                <Text style={{ alignSelf: "flex-start", fontSize: 20 }}>
                  {goal.goalName}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 10}}>
                  <TouchableOpacity style={{ marginHorizontal: 50 }}>
                    <Text style={{fontWeight:"bold"}} onPress={() => handleEditGoal(index)}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: 50 }}>
                    <Text style={{fontWeight:"bold"}} onPress={() => handleDeleteGoal(index)}>Delete</Text>
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
  GoalModal: {
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
  textInput: {
    borderColor: "gray",
    width: "80%",
    height: 50,
    padding: 8,
    margin: 10,
    borderWidth: 1,
  },
});

module.exports = GoalsScreen;
