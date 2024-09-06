import React from "react";
import Clock from "analog-clock-react";
import { Box, Typography, Grid } from "@mui/material";

// Helper function to get time for a specific timezone
const getTimeForTimezone = (timezone) => {
  return new Date().toLocaleString("en-US", { timeZone: timezone });
};

const ClockDisplay = () => {
  // Get the current times for each time zone
  const indiaTime = getTimeForTimezone("Asia/Kolkata");
  const londonTime = getTimeForTimezone("Europe/London");
  const newYorkTime = getTimeForTimezone("America/New_York");

  // Define clock options with time overrides
  const clockOptions = (time) => ({
    width: "130px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#D8BE70",
    centerColor: "#412601",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "transparent", 
      minute: "#ffffff",
      hour: "#ffffff",
    },
    time, // Manually set time
  });

  return (
    <Box className="flex justify-center items-center mt-3">
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
            INDIA
          </Typography>
          <Clock {...clockOptions(indiaTime)} />
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
            LONDON
          </Typography>
          <Clock {...clockOptions(londonTime)} />
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
            NEW YORK
          </Typography>
          <Clock {...clockOptions(newYorkTime)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClockDisplay;