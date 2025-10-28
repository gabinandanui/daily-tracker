import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';

const waterData = [
  0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0,
];

const xLabels = [
  '0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h',
  '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'
];

export default function WaterAreaChart({ intakeWaterHistoryData }) {
  const waterDataForChart = React.useMemo(() => {
    const hoursData = new Array(24).fill(0);

    intakeWaterHistoryData.forEach((item) => {
      const timeArray = item.dateTime.split(' '); // ['12-10-2025', '12:28', 'PM']
      let hour = parseInt(timeArray[1].split(':')[0]);
      const ampm = timeArray[2];
      if (ampm === 'PM' && hour !== 12) {
        hour = hour + 12;
      }
      if (ampm === 'AM' && hour === 12) {
        hour = 0;
      }
      hoursData[hour] += item.quantity;
    })
    return hoursData;
  }, [intakeWaterHistoryData])

  return (
    <Box sx={{ width: '100%', p: 2, background: '#2c2c2c', borderRadius: 2, marginTop: '20px' }}>
      <LineChart
        height={300}
        series={[
          {
            data: waterDataForChart,
            label: 'Water Intake',
            area: true,
            color: '#1976d2',
          },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{
          // Legend text (series label)
          '& .MuiChartsLegend-label': {
            color: '#fff !important',
          },
          '& .MuiChartsLegend-series': {
            fill: '#fff !important',
          },

          // Y-axis (left) labels
          '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
            fill: '#fff !important',
          },
          '& .MuiChartsAxis-left .MuiChartsAxis-label': {
            fill: '#fff !important',
          },

          // X-axis (bottom) labels
          '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
            fill: '#fff !important',
          },
          '& .MuiChartsAxis-bottom .MuiChartsAxis-label': {
            fill: '#fff !important',
          },

          // Tooltip text
          '& .MuiChartsTooltip-table': {
            color: '#fff !important',
            backgroundColor: '#333 !important',
          },
          '& .MuiChartsTooltip-cell': {
            color: '#fff !important',
          },

          // Data point markers/dots
          '& .MuiChartsLineChart-mark': {
            fill: '#fff !important',
            stroke: '#fff !important',
          },

          // Grid lines and axis lines
          '& .MuiChartsGrid-line': {
            stroke: '#FFFFFF',
          },
          '& .MuiChartsAxis-line': {
            stroke: '#FFFFFF',
          },
          '& .MuiChartsAxis-tick': {
            stroke: '#FFFFFF',
          },

          // Any other text elements
          '& text': {
            fill: '#fff !important',
          },
        }}
      />
    </Box>
  );
}
