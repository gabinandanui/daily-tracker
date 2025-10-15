// src/pages/FoodTracker.jsx
import React from 'react'
import AIFoodInput from '../components/AIFoodInput';

const FoodTracker = ({
  setSnackBar,
  setSnackBarMsg,
  currentUser,
  intakeFoodHistoryData,
  setintakeFoodHistoryData,
  targetCalories,
  setTargetCalories
}) => {
  const handleIntakeFoodAnalyzed = (data) => {
    if (data && data.amount > 0) {
      console.log(`AI detected you drank ${data.amount}${data.unit}. Adding to total.`);
      // We use the same safe updater pattern here
      let currentData = data;
      let transferSavedDate;
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      const historyKey = `intakeFoodHistory_${currentUser.uid}`;
      const savedHistory = localStorage.getItem(historyKey);
      if(savedHistory && savedHistory !== '[]') {
        transferSavedDate = JSON.parse(savedHistory);
        transferSavedDate.push(data);
      }
      else {
        transferSavedDate = [data];
      }
      setintakeFoodHistoryData(transferSavedDate);
      setSnackBar(true);
      // setSnackBarMsg(`${data.amount} ${data.unit} of ${data.drink_type} added`);
    }
  };

  return (
    <div className='flex flex-col text-white text-left'>
      <h2 className='text-white text-left font-semibold'>Food Tracker</h2>
      <p className='text-white text-left font-semibold'>Add food to track your intake</p>
      <AIFoodInput handleIntakeFoodAnalyzed={handleIntakeFoodAnalyzed} />
    </div>
  );
};

export default FoodTracker;
