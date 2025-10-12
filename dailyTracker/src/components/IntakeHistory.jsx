import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import drinkWaterGif from '../assets/drink-water-animation.gif';
import DeleteIcon from '@mui/icons-material/Delete';
const IntakeHistory = ({ intakeHistoryData, setIntakeHistoryData, setSnackBar, setSnackBarMsg }) => {
  const getNutrientIcon = (type) => {
    const normalized = type.toLowerCase();
    if (normalized === 'calories') return '🔥';
    if (normalized === 'carbs') return '🍞'; // Changed from 'carbohydrates'
    if (normalized === 'protein') return '💪';
    if (normalized === 'fats') return '🥑'; // Changed from 'fat' to match your data
    if (normalized === 'fiber') return '🌾';
    return '🥤';
  };
  const handleDelete = (id) => {
    const updatedDate = intakeHistoryData.filter((item) => item.id !== id);
    localStorage.setItem('intakeHistory', JSON.stringify(updatedDate));
    setIntakeHistoryData(updatedDate);
    setSnackBar(true);
    setSnackBarMsg('Intake deleted');
  };
  return (
    <>
      <Card sx={{
        minWidth: 275, borderRadius: 4, borderLeft: "4px solid #2196f3",
        background: 'rgba(29, 78, 216, 0.15)',
        marginTop: '20px',
        maxHeight: '70vh',
        overflowY: 'auto'
      }}>
        <CardContent>
          {intakeHistoryData && intakeHistoryData.length > 0 ? (
            <div>
              <h2 className='text-white text-left font-semibold'>Intake History</h2>

              {intakeHistoryData.map((item, index) => (
                <Card sx={{
                  minWidth: 275, borderRadius: 4, border: "1px solid #2196f3",
                  background: 'rgba(29, 78, 216, 0.15)',
                  borderRadius: '8px',
                  padding: '8px',
                  marginTop: '8px'
                }} key={item.id}>
                  <span className='text-left flex mr-auto text-white items-center'>
                    <span className="animate-pulse mr-2">{item.drink_info.icon}</span>
                    {item.amount} {item.unit} of {item.drink_type}

                    <span className="ml-auto">

                      {/* [ ['calories',16] ['protein',0.8] ['carbs',2.6] ['fats',0.5] ['fiber',0] ]
                      ↓ filter out zero
                      [ ['calories',16] ['protein',0.8] ['carbs',2.6] ['fats',0.5] ]
                      ↓ map to icons
                      [ 🔥 , 💪 , 🍞 , 🥑 ] */}
                      {item.nutrition &&
                        Object.entries(item.nutrition) // 1. Convert object to array: [['calories', 16], ['carbs', 2.6], ...]
                          .filter(([key, value]) => value > 0) // 2. Keep only items with value > 0
                          .map(([key, value]) => ( // 3. Map the filtered array to show icons
                            <span key={key} title= {String(value + 'g')} className="mr-2 cursor-pointer">
                              {getNutrientIcon(key)}
                            </span>
                          ))}
                    </span>
                  </span>
                  <span className='text-left flex mr-auto text-white'>
                    {item.dateTime.split(' ')[1] + ' ' + item.dateTime.split(' ')[2]}
                    <span className='text-left flex ml-auto text-white'>
                      <DeleteIcon color="error" fontSize="small" onClick={()=> handleDelete(item.id)} />
                    </span>
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <p className='text-white text-left font-semibold'> <span className="animate-pulse">No intake history available. Drink some water</span> <img className="mt-5 mx-auto" src={drinkWaterGif} alt="Empty" /></p>
          )}
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>


    </>
  );
};

export default IntakeHistory;
