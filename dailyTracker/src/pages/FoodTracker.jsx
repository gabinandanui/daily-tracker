// src/pages/FoodTracker.jsx
import React, {useState} from "react";
import { foodDataByKey } from "../foodData";
import AutoCompleteComponent from "../components/AutoCompleteComponent";
const FoodTracker = ({
  setSnackBar,
  setSnackBarMsg,
  currentUser,
  intakeFoodHistoryData,
  setintakeFoodHistoryData,
  targetCalories,
  setTargetCalories,
}) => {
  const handleIntakeFoodAnalyzed = (data) => {
    if (data && data.amount > 0) {
      console.log(
        `AI detected you drank ${data.amount}${data.unit}. Adding to total.`
      );
      // We use the same safe updater pattern here
      let currentData = data;
      let transferSavedDate;
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      const historyKey = `intakeFoodHistory_${currentUser.uid}`;
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory && savedHistory !== "[]") {
        transferSavedDate = JSON.parse(savedHistory);
        transferSavedDate.push(data);
      } else {
        transferSavedDate = [data];
      }
      setintakeFoodHistoryData(transferSavedDate);
      setSnackBar(true);
      // setSnackBarMsg(`${data.amount} ${data.unit} of ${data.drink_type} added`);
    }
  };

  const [footItem, setFootItem] = useState('');
  const [measurement, setMeasurement] = useState('');
  const handleFoodSelection = (data) => {
    setFootItem(data)
  }
  const handleMeasurementSelection = (data) => {
    setMeasurement(data)
  }
  return (
    <div className="flex flex-col text-white text-left">
      <h2 className="text-white text-left font-semibold">Food Tracker</h2>
      <p className="text-white text-left font-semibold">
        Add food to track your intake
      </p>
       <AutoCompleteComponent optionsList={Object.keys(foodDataByKey)} label={'Select Food Item'} handleFoodSelection={handleFoodSelection}/>
       <AutoCompleteComponent optionsList={foodDataByKey[footItem]?.measurements.map((e)=>{return(e.unit)})} handleMeasurementSelection={handleMeasurementSelection}/>
    </div>
  );
};

export default FoodTracker;
