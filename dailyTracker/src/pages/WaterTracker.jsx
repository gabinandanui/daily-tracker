import React, { useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AIWaterInput from '../components/AIWaterInput';
import IntakeHistory from '../components/IntakeHistory';
import WaterAreaChart from '../components/WaterAreaChart';
import CardsWaterChart from '../components/CardsWaterChart';
import { useAuth } from '../context/AuthContext';
import AIWaterTips from '../components/AIWaterTips';

const WaterTracker = ({ targetWater, setTargetWater, intakeHistoryData, setIntakeHistoryData, setSnackBar, setSnackBarMsg }) => {
  const targetWaterRef = useRef(null);
  const targetIntakeWaterRef = useRef(null);

  const handleTargetWaterChange = () => {
    const newTarge = parseInt(targetWaterRef.current.value, 10);
    if (!isNaN(newTarge)) {
      setTargetWater(newTarge);
    }
    setSnackBar(true);
    setSnackBarMsg('Water Target Updated')
  };
  const computedWaterml = React.useMemo(() => {
    return intakeHistoryData.reduce((total, item) => {
      return total + item.amount;
    }, 0);
  }, [intakeHistoryData])

  const { currentUser } = useAuth();

  const handleIntakeAnalyzed = (data) => {
    if (data && data.amount > 0) {
      console.log(`AI detected you drank ${data.amount}${data.unit}. Adding to total.`);
      // We use the same safe updater pattern here
      let currentData = data;
      let transferSavedDate;
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      const historyKey = `intakeHistory_${currentUser.uid}`;
      const targetKey = `targetWater_${currentUser.uid}`;
      const savedHistory = localStorage.getItem(historyKey);
      const savedTarget = localStorage.getItem(targetKey);
      if(savedHistory && savedHistory !== '[]') {
        transferSavedDate = JSON.parse(savedHistory);
        transferSavedDate.push(data);
      }
      else {
        transferSavedDate = [data];
      }
      setIntakeHistoryData(transferSavedDate);
      setSnackBar(true);
      setSnackBarMsg(`${data.amount} ${data.unit} of ${data.drink_type} added`);
    }
  };


  return (
    <>
    
      <div className='flex flex-col text-white text-left'>
        <h1>💧 Water Tracker</h1>
        <p>Stay hydrated and track your daily water intake</p>
      </div>
      <div className='flex flex-col md:flex-row gap-4 tracker-layout'>
        <div className='tracker-layout flex-1 mt-5'>
          <AIWaterInput intakeHistoryData={intakeHistoryData} setIntakeHistoryData={setIntakeHistoryData} onIntakeAnalyzed={handleIntakeAnalyzed} />
          <IntakeHistory intakeHistoryData={intakeHistoryData} setIntakeHistoryData={setIntakeHistoryData} setSnackBar={setSnackBar} setSnackBarMsg={setSnackBarMsg}/>
          <AIWaterTips intakeHistoryData={intakeHistoryData}/>
        </div>
        <div className='tracker-log flex-1'>
          <CardsWaterChart waterLevel={computedWaterml} targetWater={targetWater} />
          <h2 className='font-semibold pt-2 text-white text-center'>
          {computedWaterml}/{targetWater} ml
        </h2>
          <WaterAreaChart intakeHistoryData={intakeHistoryData}/>
          <Card variant="outlined" sx={{
            minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
            background: 'rgba(29, 78, 216, 0.15)',
            marginTop: '20px'
          }}>
            <CardContent className='flex flex-col'>
              <h2 className='font-semibold pb-2 text-white text-left'>
                Daily Water Target (ml)
              </h2>
              <div className="flex flex-col justify-between">

                <TextField
                  type='number'
                  inputRef={targetWaterRef}
                  placeholder={targetWater  || "Set daily water target" }
                  sx={{
                    input: {
                      color: 'white',
                      width: '100%'
                    },
                  }}
                  className="w-full bg-gray-800 px-3 py-2 rounded-md"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className='ml-auto mt-2 rounded-xs'
                  onClick={handleTargetWaterChange}
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default WaterTracker