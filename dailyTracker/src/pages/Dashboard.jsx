import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardsWaterChart from '../components/CardsWaterChart';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
const Dashboard = ({waterLevel, setWaterLevel, targetWater}) => {
  
  return (
    <>
      <Typography variant="h1" component="div">
        Dashboard
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.white', fontSize: 14 }}>
        Welcome back! Here's your health overview for today.
        Friday, October 10, 2025
      </Typography>
      <div className=' flex flex-row gap-4'>
        <Card sx={{
          minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
          background: 'rgba(29, 78, 216, 0.15)'
        }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'white', fontSize: 14 }}>
              💧 Hydration
            </Typography>
            <CardsWaterChart waterLevel={waterLevel} setWaterLevel={setWaterLevel} targetWater={targetWater} />
            <Typography className='font-semibold pt-2 text-white'>
              {waterLevel}/{targetWater}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" href="/water-tracker" sx={{ borderRadius: '12px', fontSize: '12px', padding: '4px 12px' }} >Add water</Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275, borderRadius: 4, }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              🚽 Urine Frequency
            </Typography>
            <Typography variant="body2">
              0 times today
            </Typography>
            <Chip label="success" color="success" variant="outlined" />
          </CardContent>
          <CardActions>
            <Button variant="contained" href="#contained-buttons" sx={{ borderRadius: '12px', fontSize: '12px', padding: '4px 12px' }} >Log</Button>
          </CardActions>
        </Card>
      </div>
    </>
  )
}

export default Dashboard