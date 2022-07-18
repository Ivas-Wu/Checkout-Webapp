import {DateTimePickerAndroid} from "react-native";
import * as React from "react";

export const DatePicker = () => {
    const [date, setDate] = React.useState(new Date(1598051730000));
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true
      })
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
}

module.exports = DatePicker.showDatepicker()