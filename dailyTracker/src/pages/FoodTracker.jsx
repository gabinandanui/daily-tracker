// src/pages/FoodTracker.jsx
import React, { useState, useRef } from "react";
import { foodDataByKey } from "../foodData";
import AutoCompleteComponent from "../components/AutoCompleteComponent";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const FoodTracker = ({
  setSnackBar,
  setSnackBarMsg,
  currentUser,
  intakeFoodHistoryData,
  setintakeFoodHistoryData,
  targetCalories,
  setTargetCalories,
}) => {

    const foodQuantityRef = useRef(null);
  
  const handleIntakeFoodAnalyzed = (data) => {
      console.log(data, currentUser);
      
      // We use the same safe updater pattern here
      let currentData = data;
      let transferSavedDate;

      const waterHistoryKey = `intakeFoodHistory_${currentUser.uid}`;
      const savedWaterHistory = localStorage.getItem(waterHistoryKey);
      if (savedWaterHistory && savedWaterHistory !== "[]") {
        transferSavedDate = JSON.parse(savedWaterHistory);
        transferSavedDate.push(data);
      } else {
        transferSavedDate = [data];
      }
      setintakeFoodHistoryData(transferSavedDate);
      setSnackBar(true);
      setSnackBarMsg(`${data.quantity} ${data.measurement} of ${data.food_type} added`);
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
      <div className="flex flex-col md:flex-row gap-4 tracker-layout">
        <div className="flex-1 mt-5">
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
              <h2 className="font-semibold pb-2 text-white text-left">
                Select Quantity
              </h2>
              <TextField
                label="Quantity"
                variant="outlined"
                type="number"
                inputRef={foodQuantityRef}
                disabled={measurementDisable}
                sx={{
                  // Target the text inside the input field
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
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
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
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
          <Button
            variant="contained"
            sx={{
              borderRadius: "12px",
              fontSize: "12px",
              padding: "4px 12px",
              marginTop: "10px",
            }}
            onClick={() => {
              handleIntakeFoodAnalyzed({
                food_type: footItem,
                measurement,
                quantity: foodQuantityRef.current.value,
              });
            }}
          >
            Submit{" "}
          </Button>
        </div>
        <div className="flex-1 mt-5">
          <Card>
            <CardContent className="flex flex-col bg-transparent">
              <h2 className="font-semibold pb-2 text-black text-left">
                Nutrition Tracker
              </h2>
              {intakeFoodHistoryData.map((item, index) => (
                <div key={index}>
                  <p className="text-black text-left">
                    {item.quantity} {item.measurement} of {item.food_type}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FoodTracker;
