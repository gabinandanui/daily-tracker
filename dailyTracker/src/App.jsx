import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ResponsiveAppBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import FoodTracker from './pages/FoodTracker';
import WaterTracker from './pages/WaterTracker';
import MedicineTracker from './pages/MedicineTracker';
import UrineTracker from './pages/UrineTracker';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function App() {
  const [targetWater, setTargetWater] = useState(()=> {
    try {
      const savedData = localStorage.getItem('targetWater');
      return savedData ? JSON.parse(savedData) : 0;
    } catch (error) {
      console.error("Failed to parse targetWater from localStorage", error);
      return [];
    }
  });
    const [snacBar, setSnacBar] = useState(false);
    const [snacBarMsg, setSnacBarMsg] = useState('');
      const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnacBar(false);
  };
  useEffect(() => {
    localStorage.setItem('targetWater', JSON.stringify(targetWater));
  }, [targetWater]);
  const [waterLevel, setWaterLevel] = useState(0);
  // Initialize state by reading from localStorage
  const [intakeHistoryData, setIntakeHistoryData] = useState(() => {
    try {
      const savedData = localStorage.getItem('intakeHistoryData');
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error("Failed to parse intake history from localStorage", error);
      return [];
    }
  });

  // save to localStorage whenever the history data changes
  useEffect(() => {
    localStorage.setItem('intakeHistoryData', JSON.stringify(intakeHistoryData));
  }, [intakeHistoryData]); // This effect runs every time intakeHistoryData is updated

  return (
    <>
    <ResponsiveAppBar />
    <Snackbar
        open={snacBar}
        autoHideDuration={6000} // Snackbar will automatically close after 6 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the Snackbar
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snacBarMsg}
        </Alert>
      </Snackbar>
    <Routes >
      <Route path="/" element={<Dashboard intakeHistoryData ={intakeHistoryData} waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater}/>}  />
      <Route path="/dashboard" element={<Dashboard intakeHistoryData ={intakeHistoryData} waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater}/>} />
      <Route path="/food-tracker" element={<FoodTracker />} />
      <Route path="/water-tracker" element={<WaterTracker setSnacBar={setSnacBar} setSnacBarMsg={setSnacBarMsg} waterLevel={waterLevel} setWaterLevel={setWaterLevel} intakeHistoryData={intakeHistoryData} setIntakeHistoryData={setIntakeHistoryData} targetWater={targetWater} setTargetWater={setTargetWater} />} />
      <Route path="/medicine-tracker" element={<MedicineTracker />} />
      <Route path="/urine-tracker" element={<UrineTracker />} />
    </Routes>
    </>
  )
}

export default App
