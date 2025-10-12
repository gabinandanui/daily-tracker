import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';

// 1. Your data for water intake over 24 hours (now with 24 points)
const waterData = [
  0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0,
];

// 2. Your labels for the x-axis (now with 24 labels)
const xLabels = [
  '0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h',
  '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'
];

export default function WaterAreaChart() {
  return (
    <Box sx={{ width: '100%', p: 2, background: '#2c2c2c', borderRadius: 2, marginTop: '20px' }}>
      <LineChart
        height={300}
        series={[
          {
            data: waterData,
            label: 'Water Intake',
            area: true,
            color: '#00bcd4',
          },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]} // Now the lengths match
        sx={{
          '.MuiChartsGrid-line': { stroke: 'rgba(255, 255, 255, 0.1)' },
          '.MuiChartsAxis-tickLabel': { fill: '#fff' },
          '.MuiChartsAxis-label': { fill: '#fff' },
          '.MuiChartsAxis-line': { stroke: 'rgba(255, 255, 255, 0.2)' },
        }}
      />
    </Box>
  );
}