import React, { useState } from "react";
import { Alert, Card, CardContent, CardHeader, Container, Typography, Stack, Box, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Select, MenuItem, InputLabel, Button, CardActions } from "@mui/material";
import deficitVsSurplus from "../assets/deficit-vs-surplus.png";
import bmr from "../assets/bmr.png";
import deficit from "../assets/deficit.png"
import GridInfoCard from "../components/GridInfoCard";
import { LocalFireDepartment, FitnessCenter, Scale } from "@mui/icons-material";
const CaloriesCalculator = () => {
  const [results, setResults] = useState(null);
  const caloriesPerKgFat = 7700;
  const minCal = { male: 1500, female: 1200 };
  const calculateBMR = ({gender, weight, height, age}) => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }
  const calculateResult = (values) => {
   const bmr = calculateBMR(values);
    const tdee = bmr * values.activityLevel;
    const weeklyDeficit = values.weeklyLossRate * caloriesPerKgFat;
    const dailyTarget = tdee - weeklyDeficit / 7;
    const totalLoss = values.weight - values.targetWeight;
    const weeksToGoal = totalLoss / values.weeklyLossRate;
    console.log('====================================');
    console.log(totalLoss / values.weeklyLossRate);
    console.log('====================================');
    return { bmr, tdee, weeklyDeficit, dailyTarget, weeksToGoal };
  }
  const initialValues = {
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    targetWeight: '',
    weeklyLossRate: ''
  }
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJsone = Object.fromEntries(formData.entries());
    console.log(formJsone);
    setResults(calculateResult(formJsone));
  }

  const activityLevels = [
    { value: "", label: 'Choose an activity level' },
    { value: "1.2", label: 'Sedentary (Little or no exercise)' },
    { value: "1.375", label: 'Lightly Active (1-3 days/week)' },
    { value: "1.55", label: 'Moderately Active (3-5 days/week)' },
    { value: "1.725", label: 'Very Active (6-7 days/week)' },
    { value: "1.9", label: 'Extra Active (intense daily)' },
  ];
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ py: 4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)",
          width: "calc(100vw - 4px)",
          maxWidth: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          borderRadius: 0,
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Understanding Your Metabolism: BMR & TDEE
        </Typography>
        <Typography align="center" color="text.white" mb={4}>
          Learn how your body uses energy and calculate your personalized
          calorie targets for weight loss.
        </Typography>
        <Card sx={{ borderRadius: 12, maxWidth: 500, margin: "0 auto" }}>
          <CardContent>
            <img src={deficitVsSurplus} alt="Deficit vs Surplus" />
          </CardContent>
        </Card>
      </Container>
      <Container
        maxWidth={false}
        sx={{ py: 4 }}
        style={{
          borderRadius: "12px",
          marginTop: "24px",
          border: "1px solid rgba(119, 124, 124, 0.2)",
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Basal Metabolic Rate (BMR)
        </Typography>
        <Typography align="center" color="text.white" mb={4}>
          BMR is the minimum number of calories your body needs at complete rest
          to perform essential life-sustaining functions like breathing,
          circulation, cell production, and maintaining body temperature. It
          accounts for 60-70% of your daily calorie burn.
        </Typography>
        <Card sx={{ borderRadius: 12, maxWidth: 500, margin: "0 auto" }}>
          <CardContent>
            <img src={bmr} alt="Deficit vs Surplus" />
          </CardContent>
        </Card>
        <h3 className="font-semibold">What BMR Covers:</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <GridInfoCard
            icon="faLungs"
            title=" Breathing & Circulation"
            percentage="60%"
            description="Essential respiratory and cardiovascular functions"
          />
          <GridInfoCard
            icon="faDna"
            title=" Cell Production & Repair"
            percentage="15%"
            description="Cellular regeneration and maintenance"
          />
          <GridInfoCard
            icon="faThermometerHalf"
            title="Body Temperature"
            percentage="10%"
            description="Maintaining optimal internal temperature"
          />
          <GridInfoCard
            icon="faUtensils"
            title="Nutrient Processing"
            percentage="10%"
            description="Basic metabolic processes and enzyme functions"
          />
          <GridInfoCard
            icon="faBrain"
            title="Brain & Nervous System"
            percentage="5%"
            description="Neural activity and brain functions"
          />
        </div>
      </Container>
      <Container
        maxWidth={false}
        sx={{ py: 4 }}
        style={{
          borderRadius: "12px",
          marginTop: "24px",
          border: "1px solid rgba(119, 124, 124, 0.2)",
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Total Daily Energy Expenditure (TDEE)
        </Typography>
        <Typography align="center" color="text.white" mb={4}>
          TDEE is the total calories you burn in a complete day, including all
          activities.
        </Typography>
        <Typography variant="h3" gutterBottom align="center">
          TDEE Breakdown:
        </Typography>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <GridInfoCard
            icon="faHeart"
            title="Basal Metabolic Rate (BMR)"
            percentage="60-70%"
            description="Energy for basic body functions"
          />
          <GridInfoCard
            icon="faRunning"
            title="Physical Activity"
            percentage="15-30%"
            description="Exercise and daily movement"
          />
          <GridInfoCard
            icon="faFire"
            title="Thermic Effect of Food (TEF)"
            percentage="10%"
            description="Energy needed to digest food"
          />
          <GridInfoCard
            icon="faWalking"
            title="NEAT"
            percentage="Variable"
            description="Non-exercise activity thermogenesis"
          />
        </div>
      </Container>
      <Container
        maxWidth={false}
        sx={{ py: 4 }}
        style={{
          borderRadius: "12px",
          marginTop: "24px",
          border: "1px solid rgba(119, 124, 124, 0.2)",
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          Creating a Calorie Deficit
        </Typography>
        <Typography align="center" color="text.white" mb={4}>
          Weight loss occurs when you consume fewer calories than your TDEE. Your body uses stored fat for energy.
        </Typography>
        <Card sx={{ borderRadius: 12, maxWidth: 500, margin: "0 auto" }}>
          <CardContent>
            <img src={deficit} alt="Deficit vs Surplus" />
          </CardContent>
        </Card>
        <Alert severity="warning" variant="outlined" className="mt-5">
          <ul className="text-white">
            <li><strong>Recommended deficit:</strong> 300-500 calories/day</li>
            <li><strong>Expected loss:</strong> 0.5-1 kg per week
            </li>
            <li><strong>Minimum intake:</strong> Women 1,200-1,500 cal, Men 1,500-1,800 cal
            </li>
          </ul>
        </Alert>
      </Container>

      <Container
        maxWidth={false}
        sx={{ py: 4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)",
          width: "calc(100vw - 4px)",
          maxWidth: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          borderRadius: 0,
        }}
      >
        <Typography variant="h2" gutterBottom align="center">
          BMR & TDEE Calculator
        </Typography>
        <Card sx={{ my: 5 }}>
          <form id="myForm" onSubmit={handleSubmit}>
            <CardHeader title="Calculate Your BMR & TDEE" />
            <CardContent>
              <Stack spacing={3}>
                <h2>Step 1: Personal Information</h2>
                <FormControl fullWidth margin="normal">
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />

                  </RadioGroup>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                  <TextField
                    helperText="Please enter your age in years"
                    id="age"
                    label="Age"
                    type="number"
                    name="age"
                    value={formValues.age}
                    onChange={handleChange}
                  />
                  <TextField
                    helperText="Please enter your weigth in kg "
                    id="weight"
                    label="Weigth in kg"
                    type="number"
                    name="weight"
                    value={formValues.weight}
                    onChange={handleChange}
                  />
                  <TextField
                    helperText="Please enter you height in cm"
                    id="height"
                    label="Height"
                    type="number"
                    name="height"
                    value={formValues.height}
                    onChange={handleChange}
                  />
                </Box>
                <h2>Step 2: Activity Level</h2>
                <FormControl fullWidth>
                  <InputLabel id="activity-level-label">Activity Level</InputLabel>
                  <Select
                    labelId="activity-level-label"
                    id="activity-level-select"
                    label="Activity Level"
                    name="activityLevel"
                    value={formValues.activityLevel}
                    onChange={handleChange}
                  >
                    {activityLevels.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <h2>Step 3: Weight Loss Goals</h2>
                <FormControl fullWidth margin="normal">
                  <TextField
                    helperText="Please enter target weight in kg"
                    id="targetWeight"
                    label="Target Weight"
                    type="number"
                    name="targetWeight"
                    value={formValues.targetWeight}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="activity-level-label">Desired Weekly Loss Rate</InputLabel>
                  <Select label="Weekly Loss Rate" name="weeklyLossRate" value={formValues.weeklyLossRate} onChange={handleChange}>
                    <MenuItem value="">Choose loss rate</MenuItem>
                    <MenuItem value="0.25">0.25 kg (slow)</MenuItem>
                    <MenuItem value="0.5">0.5 kg (recommended)</MenuItem>
                    <MenuItem value="0.75">0.75 kg (moderate)</MenuItem>
                    <MenuItem value="1.0">1 kg (aggressive)</MenuItem>
                  </Select>
                </FormControl>

              </Stack>
            </CardContent>


            <CardActions sx={{ justifyContent: 'end', mb: 1 }}>
              <Button variant="outlined" type="reset" onClick={() => setFormValues(initialValues)}>
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
            {(results.dailyTarget < minCal['gender']) && (
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

      </Container>
    </>
  );
};

export default CaloriesCalculator;
