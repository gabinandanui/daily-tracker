import React from "react";
import { Alert, Card, CardContent, Container, Typography } from "@mui/material";
import deficitVsSurplus from "../assets/deficit-vs-surplus.png";
import bmr from "../assets/bmr.png";
import deficit from "../assets/deficit.png"
import GridInfoCard from "../components/GridInfoCard";
const CaloriesCalculator = () => {
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

        
      </Container>
    </>
  );
};

export default CaloriesCalculator;
