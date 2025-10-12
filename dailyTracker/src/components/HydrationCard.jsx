import React from 'react'
import Box from '@mui/material/Box';
import CardsWaterChart from '../components/CardsWaterChart';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HydrationCard = ({ waterLevel, setWaterLevel, targetWater, intakeHistoryData }) => {
  return (
    <Card sx={{
      minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
      background: 'rgba(29, 78, 216, 0.15)',
      padding: '10px'
    }}>
      <CardContent>
        <h2 className='font-semibold text-white pb-5 text-left' gutterBottom sx={{ color: 'white', fontSize: 14 }}>
          💧 Hydration
        </h2>
        <CardsWaterChart waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater} />
        <h2 className='font-semibold pt-2 text-white'>
          {waterLevel}/{targetWater} ml
        </h2>
      </CardContent>
      <CardActions>
        <Button variant="contained" href="/water-tracker" sx={{ borderRadius: '12px', fontSize: '12px', padding: '4px 12px' }} >Add water</Button>
      </CardActions>
    </Card>
  )
}

export default HydrationCard