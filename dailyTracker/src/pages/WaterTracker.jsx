import React, { useRef } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

const WaterTracker = ({waterLevel, setWaterLevel, targetWater, setTargetWater}) => {
 const targetWaterRef = useRef(0);
 const targetIntakeWaterRef = useRef(0);
  const handleTargetWaterChange = () => {
    console.log(targetWaterRef.current.value);
    
    setTargetWater(targetWaterRef.current.value);
  };
  const handleIntakeWaterChange = () => {
    console.log(targetIntakeWaterRef.current.value);
    
    setWaterLevel(targetIntakeWaterRef.current.value);
  }
  return (
    <>
      <div className='flex flex-col'>
        <h1>💧 Water Tracker</h1>
        <p>Stay hydrated and track your daily water intake</p>
      </div>
      <div className='flex flex-row gap-4 tracker-layout'>
        <div className='tracker-layout flex-1'>
          <Card variant="outlined" sx={{
            minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
            background: 'rgba(29, 78, 216, 0.15)'
          }}>
            <CardContent className='flex flex-col'>
              <Typography className='font-semibold pb-2 text-white text-left'>
                Daily Water Target (ml)
              </Typography>
              <div className="flex justify-between">

              <TextField
                placeholder="Set daily water target"
                type='number'
                inputRef={targetWaterRef}
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
                  sx={{ borderRadius: 999 }}
                  onClick={handleTargetWaterChange}
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='tracker-log flex-1'>
          <Card variant="outlined" sx={{
            minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
            background: 'rgba(29, 78, 216, 0.15)'
          }}>
            <CardContent className='flex flex-col'>
              <Typography className='font-semibold pb-2 text-white text-left'>
                Add intake (ml)
              </Typography>
              <div className="flex justify-between">

              <TextField
                placeholder="Set your intake"
                type='number'
                inputRef={targetIntakeWaterRef}
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
                  sx={{ borderRadius: 999 }}
                  onClick={handleIntakeWaterChange}
                >
                  Add
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