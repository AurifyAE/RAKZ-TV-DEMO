// SpotRate.jsx
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import goldBar from "../assets/goldBar.png";
import silverBar from "../assets/silverBar.png";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getBackgroundColor = (change) => {
    if (change === "up") {
      return "green"; // Green color for increase
    } else if (change === "down") {
      return "red"; // Red color for decrease
    }
    return ""; // White color for no change
  };

  const getColor = (change) => {
    if (change === "up") {
      return "white"; // Green color for increase
    } else if (change === "down") {
      return "white"; // Red color for decrease
    }
    return "#412601"; // White color for no change
  };

  const renderSpotSection = (metal, data) => (
    <Box
      sx={{
        borderRadius: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2vw",
          fontWeight: "bold",
          color: "#412601",
          backgroundColor: "#D8BE70",
          height: "190px",
          width: "180px",
          borderBottomLeftRadius: "50px",
          borderTopLeftRadius: "50px",
        }}
      >
        <img
          src={metal === "gold" ? goldBar : silverBar}
          alt=""
          className="w-20 h-20"
        />
        {metal.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#F6F5F2",
          padding: "15px 45px",
          height: "190px",
          width: "100%",
          borderBottomRightRadius: "50px",
          borderTopRightRadius: "50px",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: "2vw",
              fontWeight: "bold",
              color: "#412601",
            }}
          >
            BID
          </Typography>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "8px",
              fontSize: "2vw",
              fontWeight: "bold",
              margin: "1vw 0",
              color: getColor(data.bidChanged),
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: "3px solid #412601",
              width: "10vw",
            }}
          >
            {data.bid}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1.3vw", color: "#412601", fontWeight: "bold" }}
          >
            LOW {data.low}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: "2vw",
              fontWeight: "bold",
              color: "#412601",
            }}
          >
            ASK
          </Typography>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "6px",
              borderRadius: "8px",
              fontSize: "2vw",
              fontWeight: "bold",
              margin: "1vw 0",
              color: getColor(data.bidChanged),
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: "3px solid #412601",
              width: "10vw",
            }}
          >
            {data.ask}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1.3vw", color: "#412601", fontWeight: "bold" }}
          >
            HIGH {data.high}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      className="mx-auto rounded-lg text-center mt-5"
      sx={{
        maxWidth: "100%",
        backgroundColor: "",
        borderRadius: "25px",
        color: "white",
      }}
    >
      {/* <Typography
        variant="h4"
        component="h2"
        sx={{
          fontSize: "2vw",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#FFFFFF",
        }}
      >
        Spot Rate ($)
      </Typography> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2vw" }}>
        {renderSpotSection("gold", goldData)}
        {renderSpotSection("silver", silverData)}
      </Box>
    </Box>
  );
};

export default SpotRate;
