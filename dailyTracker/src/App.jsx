import { useState } from 'react'
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
function App() {
  const [targetWater, setTargetWater] = useState(2200);
  const [waterLevel, setWaterLevel] = useState(500);

  return (
    <>
    <ResponsiveAppBar />
    <Routes >
      <Route path="/" element={<Dashboard waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater}/>}  />
      <Route path="/dashboard" element={<Dashboard waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater}/>} />
      <Route path="/food-tracker" element={<FoodTracker />} />
      <Route path="/water-tracker" element={<WaterTracker waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater} setTargetWater={setTargetWater}/>} />
      <Route path="/medicine-tracker" element={<MedicineTracker />} />
      <Route path="/urine-tracker" element={<UrineTracker />} />
    </Routes>
    </>
  )
}

export default App
