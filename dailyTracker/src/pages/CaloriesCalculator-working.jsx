import React from 'react';
import {
  Container, Grid, Card, CardHeader, CardContent, CardActions, CardMedia,
  Stack, Typography, TextField, FormControl, FormLabel,
  RadioGroup, Radio, FormControlLabel, Select, MenuItem, InputLabel,
  Button, Alert, Tooltip, IconButton, Chip, Divider
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LocalFireDepartment, FitnessCenter, Scale, InfoOutlined } from '@mui/icons-material';

const activityLevels = [
  { value: 1.2, label: 'Sedentary (Little or no exercise)' },
  { value: 1.375, label: 'Lightly Active (1-3 days/week)' },
  { value: 1.55, label: 'Moderately Active (3-5 days/week)' },
  { value: 1.725, label: 'Very Active (6-7 days/week)' },
  { value: 1.9, label: 'Extra Active (intense daily)' },
];

const minCal = { male: 1500, female: 1200 };
const caloriesPerKgFat = 7700;

function calculateBMR({ gender, weight, height, age }) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

function calculateResults(values) {
  const bmr = calculateBMR(values);
  const tdee = bmr * values.activity;
  const weeklyDeficit = values.lossRate * caloriesPerKgFat;
  const dailyTarget = tdee - weeklyDeficit / 7;
  const totalLoss = values.weight - values.targetWeight;
  const weeksToGoal = totalLoss / values.lossRate;
  return { bmr, tdee, weeklyDeficit, dailyTarget, weeksToGoal };
}

export default function CaloriesCalculator() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      gender: 'male',
      age: '',
      weight: '',
      height: '',
      activity: 1.2,
      targetWeight: '',
      lossRate: 0.5
    }
  });
  const [results, setResults] = React.useState(null);

  const onSubmit = data => {
    // Numeric conversion
    Object.keys(data).forEach(key => data[key] = parseFloat(data[key]) || data[key]);
    setResults(calculateResults(data));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Understanding Your Metabolism: BMR & TDEE
      </Typography>
      <Typography align="center" color="text.secondary" mb={4}>
        Learn how your body uses energy and calculate your personalized calorie targets for weight loss.
      </Typography>

      <Grid container spacing={4}>
        {/* BMR Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="What is BMR (Basal Metabolic Rate)?" />
            <CardMedia
              component="img"
              image="bmr-organs.png"
              alt="BMR organs infographic"
              sx={{ aspectRatio: '2/1', objectFit: 'contain', p: 2, background: '#f7f9fc' }}
            />
            <CardContent>
              <Typography>
                BMR is the minimum number of calories your body needs to support basic functions at rest including breathing, circulation, and cell repair. 
                It typically makes up 60-70% of your total daily calorie burn.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* TDEE Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader title="What is TDEE (Total Daily Energy Expenditure)?" />
            <CardMedia
              component="img"
              image="energy-balance.png"
              alt="Energy balance infographic"
              sx={{ aspectRatio: '2/1', objectFit: 'contain', p: 2 }}
            />
            <CardContent>
              <Typography>
                TDEE is the total calories you burn in a day, factoring in your BMR, physical activity, digestion, and even small movements (NEAT).
              </Typography>
              <Divider sx={{ my: 2 }} />
              <ul>
                <li>BMR: 60-70% (basic body function)</li>
                <li>Physical Activity: 15-30%</li>
                <li>Thermic Effect of Food: 10%</li>
                <li>NEAT: non-exercise activity</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Calorie Deficit Section */}
      <Card elevation={3} sx={{ my: 5 }}>
        <CardHeader title="Weight Loss and Calorie Deficit" />
        <CardMedia
          component="img"
          image="deficit-steps.png"
          alt="Calorie deficit steps"
          sx={{ maxHeight: 280, objectFit: 'contain', p: 2 }}
        />
        <CardContent>
          <Typography variant="body1">
            Weight loss occurs when you eat fewer calories than your TDEE. Aim for a deficit of 300-500 calories/day for sustainable progress.
          </Typography>
          <Stack direction="row" gap={2} my={2}>
            <Chip label="Min. Intake: 1200 (Women)" color="info" size="small" />
            <Chip label="Min. Intake: 1500 (Men)" color="info" size="small" />
          </Stack>
        </CardContent>
      </Card>

      {/* Calculator Card */}
      <Card sx={{ my: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Calculate Your BMR & TDEE" />
          <CardContent>
            <Stack spacing={3}>
              {/* Gender */}
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              {/* Age */}
              <Controller
                name="age"
                control={control}
                rules={{ required: 'Age required', min: 15, max: 100 }}
                render={({ field }) => (
                  <TextField {...field} label="Age" type="number" error={!!errors.age} helperText={errors.age?.message} required />
                )}
              />
              {/* Weight */}
              <Controller
                name="weight"
                control={control}
                rules={{ required: 'Weight required', min: 30, max: 300 }}
                render={({ field }) => (
                  <TextField {...field} label="Current Weight (kg)" type="number" error={!!errors.weight} helperText={errors.weight?.message} required />
                )}
              />
              {/* Height */}
              <Controller
                name="height"
                control={control}
                rules={{ required: 'Height required', min: 120, max: 220 }}
                render={({ field }) => (
                  <TextField {...field} label="Height (cm)" type="number" error={!!errors.height} helperText={errors.height?.message} required />
                )}
              />
              {/* Activity Level */}
              <FormControl>
                <InputLabel>Activity Level</InputLabel>
                <Controller
                  name="activity"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Activity Level">
                      {activityLevels.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {/* Target Weight */}
              <Controller
                name="targetWeight"
                control={control}
                rules={{
                  required: 'Target weight required',
                  validate: value => value < watch('weight') || 'Target must be less than current'
                }}
                render={({ field }) => (
                  <TextField {...field} label="Target Weight (kg)" type="number" error={!!errors.targetWeight} helperText={errors.targetWeight?.message} required />
                )}
              />
              {/* Weekly Loss Rate */}
              <FormControl>
                <InputLabel>Weekly Loss Rate</InputLabel>
                <Controller
                  name="lossRate"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Weekly Loss Rate">
                      <MenuItem value={0.25}>0.25 kg (slow)</MenuItem>
                      <MenuItem value={0.5}>0.5 kg (recommended)</MenuItem>
                      <MenuItem value={0.75}>0.75 kg (moderate)</MenuItem>
                      <MenuItem value={1.0}>1 kg (aggressive)</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'end', mb: 1 }}>
            <Button variant="outlined" type="reset" onClick={() => setResults(null)}>
              Reset
            </Button>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </CardActions>
        </form>
      </Card>

      {/* Results Display */}
      {results && (
        <Card sx={{ my: 5 }}>
          <CardHeader title="Your Results" />
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocalFireDepartment color="error" />
              <Typography><b>BMR:</b> {results.bmr.toFixed(0)} calories/day</Typography>
              <FitnessCenter color="primary" />
              <Typography><b>TDEE:</b> {results.tdee.toFixed(0)} calories/day</Typography>
              <Scale color="success" />
              <Typography><b>Target Calories:</b> {results.dailyTarget.toFixed(0)} calories/day</Typography>
            </Stack>
            <Typography sx={{ mt: 2 }}>
              Estimated weeks to goal: <b>{results.weeksToGoal.toFixed(1)}</b>
            </Typography>
            {(results.dailyTarget < minCal[watch('gender')]) && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Daily calories below safe minimum. Please raise your goal or consult a doctor.
              </Alert>
            )}
            {(results.weeklyDeficit / 7 > 1000) && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Your daily deficit is above recommended maximum (1000 cal/day)!
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Important Reminders */}
      <Card sx={{ my: 5 }}>
        <CardHeader title="Important Reminders" />
        <CardContent>
          <ul>
            <li>Recalculate your numbers every 5-10 kg of weight loss</li>
            <li>Focus on nutrient-dense foods and avoid starvation diets</li>
            <li>Combine calorie deficit with exercise for the best results</li>
            <li>
              Consult a healthcare provider before starting any weight loss plan
              <Tooltip title="Always talk to a qualified doctor before starting any diet.">
                <IconButton size="small"><InfoOutlined /></IconButton>
              </Tooltip>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}
