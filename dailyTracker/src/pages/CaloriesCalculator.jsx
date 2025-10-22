import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import deficitVsSurplus from "../assets/deficit-vs-surplus.png";
import bmr from "../assets/bmr.png";
import GridInfoCard from "../components/GridInfoCard";
const CaloriesCalculator = () => {
  return (

    <>
    <Container maxWidth="lg" sx={{ py: 4 }} style={{ background: "linear-gradient(135deg, rgba(29, 78, 216, 0.15) 0%, rgba(8, 145, 178, 0.15) 100%)", width: "calc(100vw - 4px)",
    maxWidth: "100vw",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw", 
    marginRight: "-50vw",
    borderRadius: 0,  }}>
      <Typography variant="h2" gutterBottom align="center">
        Understanding Your Metabolism: BMR & TDEE
      </Typography>
      <Typography align="center" color="text.white" mb={4}>
        Learn how your body uses energy and calculate your personalized calorie
        targets for weight loss.
      </Typography>
      <Card sx={{ borderRadius: 12, maxWidth: 500, margin: "0 auto" }}>
        <CardContent>
          <img src={deficitVsSurplus} alt="Deficit vs Surplus" />
        </CardContent>
      </Card>
    </Container>
    <Container maxWidth="lg" sx={{ py: 4 }} style={{ borderRadius: "12px", marginTop: "24px",border: "1px solid rgba(119, 124, 124, 0.2)" }}>
      <Typography variant="h2" gutterBottom align="center">
        Basal Metabolic Rate (BMR)
      </Typography>
      <Typography align="center" color="text.white" mb={4}>
        BMR is the minimum number of calories your body needs at complete rest to perform essential life-sustaining functions like breathing, circulation, cell production, and maintaining body temperature. It accounts for 60-70% of your daily calorie burn.
      </Typography>
      <Card sx={{ borderRadius: 12, maxWidth: 500, margin: "0 auto" }}>
        <CardContent>
          <img src={bmr} alt="Deficit vs Surplus" />
        </CardContent>
      </Card>
      <Typography variant="h3" gutterBottom align="center">
        Basal Metabolic Rate (BMR)
      </Typography>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <GridInfoCard
          icon="faLungs"
          title=" Breathing & Circulation"
          percentage="60%"
          description="Essential respiratory and cardiovascular functions"
        />
        <GridInfoCard
          icon="faLungs"
          title=" Breathing & Circulation"
          percentage="60%"
          description="Essential respiratory and cardiovascular functions"
        />
        <GridInfoCard
          icon="faLungs"
          title=" Breathing & Circulation"
          percentage="60%"
          description="Essential respiratory and cardiovascular functions"
        />
        <GridInfoCard
          icon="faLungs"
          title=" Breathing & Circulation"
          percentage="60%"
          description="Essential respiratory and cardiovascular functions"
        />
        <GridInfoCard
          icon="faLungs"
          title=" Breathing & Circulation"
          percentage="60%"
          description="Essential respiratory and cardiovascular functions"
        />
      </div>
    </Container>
    </>
  );
};

export default CaloriesCalculator;
