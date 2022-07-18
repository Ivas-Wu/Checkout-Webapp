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

var editGoalIndex = null    // indicates index of goal when editing goals, if null then it is an add operation
const GOAL_STORAGE_KEY = "goal_storage_key"

class Goal {
  constructor(description) {
    this.description = description;
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
    const [date, setDate] = React.useState(new Date());
    const [showDate, setShowDate] = React.useState(false);

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
        setGoals([...GoalList, goal]);
      } else {
        console.log("edit: ", editGoalIndex)
        let GoalListCopy = [...GoalList];
        GoalListCopy.splice(editGoalIndex, 1, goal)
        setGoals(GoalListCopy);
        editGoalIndex = null
      }
      
      toggleGoalModal();
    };

    const handleEditGoal = (index) => {
      editGoalIndex = index
      console.log("indexes: ", index, editGoalIndex)
      toggleGoalModal();
    }

    const handleDeleteGoal = (index) => {
        let GoalListCopy = [...GoalList];
        GoalListCopy.splice(index, 1);
        setGoals(GoalListCopy);
    };

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
              setGoal(new Goal(val))
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

      <TouchableOpacity
        onPress={handleSaveGoals}
        style={styles.newGoalButton}
      >
        <View style={{ flex: 1 }}>
          <Ionicons name={"cloud-upload-outline"} size={26} color={"black"} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bigText}>Upload Goals</Text>
        </View>
        <View style={{ flex: 1 }}/>
      </TouchableOpacity>

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
        
      </TouchableOpacity>

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
                  {goal.description}
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
