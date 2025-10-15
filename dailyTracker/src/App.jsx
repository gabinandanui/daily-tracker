import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// MUI Components
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

// Your App Components
import ResponsiveAppBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import FoodTracker from './pages/FoodTracker';
import WaterTracker from './pages/WaterTracker';
import MedicineTracker from './pages/MedicineTracker';
import UrineTracker from './pages/UrineTracker';

// Firebase Auth Components (These were missing)
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Get the current user from the Auth Context
  const { currentUser } = useAuth();

  // State for Snackbar notifications
  const [snackBar, setSnackBar] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');

  // State for user-specific data
  const [targetWater, setTargetWater] = useState(2200); // Default value
  const [intakeWaterHistoryData, setintakeWaterHistoryData] = useState([]);


  // State for user-specific data for Food
  const [targetCalories, setTargetCalories] = useState(2200); // Default value
  const [intakeFoodHistoryData, setintakeFoodHistoryData] = useState([]);

  // --- User-Specific localStorage Logic ---

  // EFFECT 1: Load data from localStorage when the user logs in
  useEffect(() => {
    if (currentUser) {
      // Create user-specific keys for localStorage
      const historyKey = `intakeWaterHistory_${currentUser.uid}`;
      const targetKey = `targetWater_${currentUser.uid}`;

      try {
        const savedHistory = localStorage.getItem(historyKey);
        const savedTarget = localStorage.getItem(targetKey);

        setintakeWaterHistoryData(savedHistory ? JSON.parse(savedHistory) : []);
        setTargetWater(savedTarget ? JSON.parse(savedTarget) : 2200);
      } catch (error) {
        console.error("Failed to parse data from localStorage", error);
      }
    }
  }, [currentUser]); // This effect re-runs only when the user changes

  // EFFECT 2: Save data to localStorage whenever it changes for the current user
  useEffect(() => {
    if (currentUser) {
      const historyKey = `intakeWaterHistory_${currentUser.uid}`;
      const targetKey = `targetWater_${currentUser.uid}`;

      localStorage.setItem(historyKey, JSON.stringify(intakeWaterHistoryData));
      localStorage.setItem(targetKey, JSON.stringify(targetWater));
    }
  }, [intakeWaterHistoryData, targetWater, currentUser]); // This effect runs when data changes

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box component="main" sx={{ p: 3 }}>
        <Snackbar
          open={snackBar}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {snackBarMsg}
          </Alert>
        </Snackbar>

        <Routes>
          {/* Public route for logging in */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes wrapped in the ProtectedRoute component */}
          <Route path="/" element={<ProtectedRoute><Dashboard intakeWaterHistoryData={intakeWaterHistoryData} targetWater={targetWater} /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard intakeWaterHistoryData={intakeWaterHistoryData} targetWater={targetWater} /></ProtectedRoute>} />
          <Route path="/food-tracker" element={<ProtectedRoute ><FoodTracker currentUser={currentUser} setSnackBar={setSnackBar} setSnackBarMsg={setSnackBarMsg} intakeFoodHistoryData={intakeFoodHistoryData} setintakeFoodHistoryData={setintakeFoodHistoryData} targetCalories={targetCalories} setTargetCalories={setTargetCalories} /></ProtectedRoute>} />
          <Route path="/water-tracker" element={<ProtectedRoute><WaterTracker setSnackBar={setSnackBar} setSnackBarMsg={setSnackBarMsg} intakeWaterHistoryData={intakeWaterHistoryData} setintakeWaterHistoryData={setintakeWaterHistoryData} targetWater={targetWater} setTargetWater={setTargetWater} /></ProtectedRoute>} />
          <Route path="/medicine-tracker" element={<ProtectedRoute><MedicineTracker /></ProtectedRoute>} />
          <Route path="/urine-tracker" element={<ProtectedRoute><UrineTracker /></ProtectedRoute>} />
        </Routes>¯̦
      </Box>
    </>
  );
}

export default App;