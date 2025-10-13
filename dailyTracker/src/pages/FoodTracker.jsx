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
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      
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
