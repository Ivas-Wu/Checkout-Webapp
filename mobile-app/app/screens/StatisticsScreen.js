import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import "../GlobalVars"
import {Picker} from '@react-native-picker/picker';
import { render } from "react-dom";

function StatisticsScreen() {
  const DEVICE_IP = "192.168.0.155"
  const [receiptData, setReceiptData] = React.useState([]);
  const [allUsersAvg, setAllUsersAvg] = React.useState(0);
  const [weeklyAvg, setWeeklyAvg] = React.useState(0);
  const [monthlyAvg, setMonthlyAvg] = React.useState(0);
  const [category, setCategory] = React.useState("all");

  const getReceiptData = async () => {
    setReceiptData(await handleGet(`http://${DEVICE_IP}:3000/api/receipts?userId=${USER_ID}`))
    //console.log(receiptData)
  }

  const handleGet = async (url) => {
    try {
        const response = await fetch(url)
        //console.log(url)
        const json = await response.json()
        //const text = await response.text()
        //console.log("text: ", text)
        //setTemp(json["average"])
        //console.log(json)
        return json
    } catch (error) {
        console.error(error)
    }
  }

  const handleGetAverages = async (timeframe, month=null) => {
    // var category_string = ``
    // if (category != "all") {
    //   category_string = `&category=${category}`
    // }

    // var url = `http://${DEVICE_IP}:3000/api/recommender/average?userId=${USER_ID}${category_string}`
    // console.log(url)
    // var temp = await handleGet(url)
    // //if (isNaN(temp["average"]))  temp["average"] = 0
    // setAllUsersAvg(temp["average"])
    // var url = `http://${DEVICE_IP}:3000/api/recommender/weeklyAverage?userId=${USER_ID}${category_string}`
    // console.log(url)
    
    // var temp = await handleGet(url)
    // //if (isNaN(temp["average"]))  temp["average"] = 0
    // setWeeklyAvg(temp["average"])

    // var url = `http://${DEVICE_IP}:3000/api/recommender/monthlyAverage?userId=${USER_ID}${category_string}`
    // console.log(url)
    // //if (isNaN(temp["average"]))  temp["average"] = 0
    // var temp = await handleGet(url)
    // setMonthlyAvg(temp["average"])
  }

  const showByCategory = () => {
    return "hi"
  }

  React.useEffect(() => {
    handleGetAverages()
    getReceiptData()
}, [category])

    return (
      <View style={styles.pageBackground}>
        <View style={{width:"60%", height:"8%", backgroundColor:"lightblue", borderRadius:20}}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Entertainment" value="entertainment" />
            <Picker.Item label="Groceries" value="groceries" />
            <Picker.Item label="Housing" value="housing" />
            <Picker.Item label="Transportation" value="transportation" />
            <Picker.Item label="Utilities" value="utilities" />
          </Picker>
        </View>
        
        <Text style={styles.statsText}>
          Your total average spending is: ${parseFloat(allUsersAvg).toFixed(2)}{"\n"}
          Your average spending this week is: ${parseFloat(weeklyAvg).toFixed(2)}{"\n"}
          Your average spending this month is: ${parseFloat(monthlyAvg).toFixed(2)}{"\n"}
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