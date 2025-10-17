// src/pages/FoodTracker.jsx
import React, { useState } from "react";
import { foodDataByKey } from "../foodData";
import AutoCompleteComponent from "../components/AutoCompleteComponent";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
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

  const [footItem, setFootItem] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [measurementDisable, setMeasurementDisable] = useState(true);
  const handleFoodSelection = (data) => {
    setFootItem(data);
    setMeasurement(null);
    setMeasurementDisable(data === null ? true : false);
  };
  const handleMeasurementSelection = (data) => {
    setMeasurement(data);
  };
  return (
    <div className="flex flex-col text-white text-left">
      <h2 className="text-white text-left font-semibold">Food Tracker</h2>
      <p className="text-white text-left font-semibold">
        Add food to track your intake
      </p>
      <AutoCompleteComponent
        optionsList={Object.keys(foodDataByKey)}
        label={"Select Food Item"}
        handleSelect={handleFoodSelection}
        value={footItem}
      />
      <AutoCompleteComponent
        optionsList={foodDataByKey[footItem]?.measurements.map((e) => {
          return e.unit;
        })}
        handleSelect={handleMeasurementSelection}
        value={measurement}
        measurementDisable={measurementDisable}
      />

      <Card
            variant="outlined"
            sx={{
              minWidth: 275,
              borderRadius: 4,
              borderLeft: "4px solid #2196f3",
              background: "rgba(29, 78, 216, 0.15)",
              marginTop: "20px",
            }}
          >
            <CardContent className="flex flex-col">
              <h2 className="font-semibold pb-2 text-white text-left">Select Quantity</h2>
              <TextField 
        label="Quantity"
        variant="outlined"
        type="number"
        
        disabled={measurementDisable}
        sx={{
            // Target the text inside the input field
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              borderColor: "#747474", // Your desired disabled color
            },
            "& .MuiFormLabel-root.Mui-disabled": {
              color: "#747474", // Your desired disabled color
            },
            // Target the label text
            "& .MuiInputLabel-root": {
              color: "#aab4c2", // A lighter grey for the label
            },
            // Target the label text when focused
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#2196f3", // Blue color on focus
            },
            // Target the border of the input
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(33, 150, 243, 0.5)",
            },
            // Change border on hover
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2196f3",
            },
            // Change border when focused
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#2196f3",
              },
            
          }}
        />
            </CardContent>
          </Card>
      
    </div>
  );
};

export default FoodTracker;
