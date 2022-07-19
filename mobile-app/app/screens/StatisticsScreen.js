import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

function StatisticsScreen() {
  const DEVICE_IP = "192.168.0.155"
  var userId = 2
  const [text, setText] = React.useState("Sample Text");
  const [text2, setText2] = React.useState("Sample Text");

  const handleGetGoals = async () => {
    var goals = await handleGetGoals()
    setText(goals)
  }

    return (
      <View style={styles.pageBackground}>
        <TextInput
            multiline={true}
            placeholder="Enter Text"
            onChangeText={(val) => setText(val)}
        />
        <Text>Statistics</Text>
        <Button
          title="get goals"
          onPress={handleGetGoals}
        />
        <Text>{text}</Text>
        <Text>{text2}</Text>
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
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
  },
  goal: {
    flex: 1,
    backgroundColor: "deepskyblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    margin: 5
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
  }
});

module.exports = StatisticsScreen