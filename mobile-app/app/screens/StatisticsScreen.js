import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import "../GlobalVars"
import {Picker} from '@react-native-picker/picker';

function StatisticsScreen() {
  const DEVICE_IP = "192.168.0.155"
  const [allUsersAvg, setAllUsersAvg] = React.useState(0);
  const [weeklyAvg, setWeeklyAvg] = React.useState(0);
  const [monthlyAvg, setMonthlyAvg] = React.useState(0);
  const [month, setMonth] = React.useState("Jan");

  const handleGet = async (url) => {
    try {
        const response = await fetch(url)
        console.log(url)
        const json = await response.json()
        //const text = await response.text()
        //console.log("text: ", text)
        //setTemp(json["average"])
        console.log(json["average"])
        return json["average"]
    } catch (error) {
        console.error(error)
    }
  }

  const handleGetAverages = async (timeframe, month=null) => {
    setAllUsersAvg(await handleGet(`http://${DEVICE_IP}:3000/api/recommender/average`))
    console.log("all ", allUsersAvg)
    setWeeklyAvg(await handleGet(`http://${DEVICE_IP}:3000/api/recommender/average?userId=${USER_ID}`))
    console.log("weekly ", weeklyAvg)
    setMonthlyAvg(await handleGet(`http://${DEVICE_IP}:3000/api/recommender/monthlyAverage?userId=${USER_ID}`))
    console.log("monthly ", monthlyAvg)
  }

  React.useEffect(() => {
    handleGetAverages()
}, [allUsersAvg,weeklyAvg,monthlyAvg])

    return (
      <View style={styles.pageBackground}>
        {/* <View style={{width:"25%", height:"8%", backgroundColor:"silver", borderRadius:20}}>
          <Picker
            selectedValue={month}
            onValueChange={(itemValue, itemIndex) =>
              setMonth(itemValue)
            }>
            <Picker.Item label="Jan" value="1" />
            <Picker.Item label="Feb" value="2" />
            <Picker.Item label="Mar" value="3" />
            <Picker.Item label="Apr" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="Jun" value="6" />
          </Picker>
        </View> */}
        
        <Text style={styles.statsText}>
          The average user's total spending is: ${parseFloat(allUsersAvg).toFixed(2)}{"\n"}
          Your average spending this week is: ${parseFloat(weeklyAvg).toFixed(2)}{"\n"}
          Your average spending this month is: ${parseFloat(monthlyAvg).toFixed(2)}
        </Text>
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
  },
  bigText: {
      fontSize: 20,
      fontFamily: "Roboto",
      fontWeight: "bold",
      textAlign: 'center',
  },
  statsText: {
    fontSize: 15,
      fontFamily: "Roboto",
      fontWeight: "bold",
      textAlign: 'center',
  }
});

module.exports = StatisticsScreen