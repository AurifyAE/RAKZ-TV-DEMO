import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityGrid = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  // Helper function to get bid and ask values based on metal type
  const getBidAskValues = (metal) => {
    if (metal === "gold" || metal === "gold kilobar" || metal === "gold ten tola") {
      return {
        bid: parseFloat(goldData.bid) || 0,
        ask: parseFloat(goldData.ask) || 0,
      };
    } else if (metal === "silver") {
      return {
        bid: parseFloat(silverData.bid) || 0,
        ask: parseFloat(silverData.ask) || 0,
      };
    }
    return { bid: 0, ask: 0 };
  };

  // Helper function to calculate purity power
  const calculatePurityPower = (purityInput) => {
    if (!purityInput || isNaN(purityInput)) return 1;
    return purityInput / Math.pow(10, purityInput.toString().length);
  };

  // Helper function to conditionally round values
  const formatValue = (value, weight) => {
    return weight === "GM" ? value.toFixed(2) : Math.round(value);
  };

  return (
    <Grid
      container
      sx={{
        padding: "20px",
        borderRadius: "35px",
        boxShadow: "0px 5px 10px rgba(200, 200, 205, 0.4)",
      }}
    >
      {commodities.map((commodity, index) => {
        const { bid, ask } = getBidAskValues(commodity.metal.toLowerCase());
        const {
          unit,
          weight,
          buyCharge,
          sellCharge,
          buyPremium,
          sellPremium,
          purity,
        } = commodity;

        const unitMultiplier =
          {
            GM: 1,
            KG: 1000,
            TTB: 116.64,
            TOLA: 11.664,
            OZ: 31.1034768,
          }[weight] || 1;

        const purityValue = parseFloat(purity) || 0;
        const purityPower = calculatePurityPower(purityValue);
        const buyChargeValue = parseFloat(buyCharge) || 0;
        const sellChargeValue = parseFloat(sellCharge) || 0;
        const buyPremiumValue = parseFloat(buyPremium) || 0;
        const sellPremiumValue = parseFloat(sellPremium) || 0;

        const biddingValue = bid + buyPremiumValue;
        const askingValue = ask + sellPremiumValue;
        const biddingPrice = (biddingValue / 31.103) * 3.674;
        const askingPrice = (askingValue / 31.103) * 3.674;

        const buyPrice =
          biddingPrice * unitMultiplier * purityPower + buyChargeValue;
        const sellPrice =
          askingPrice * unitMultiplier * purityPower + sellChargeValue;

        return (
          <Grid item xs={6} key={index}>
            <CardContent>
              <Typography
                sx={{
                  backgroundColor: "#2F1B12",
                  padding: "5px",
                  borderRadius: "40px 40px 0 0",
                  fontWeight: "bold",
                  fontSize: "1.5vw",
                  color: "#FFFFFF",
                }}
              >
                {purity} {commodity.metal.toUpperCase()}
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "#F6F5F2",
                  padding: "5px 10px",
                  fontWeight: "bold",
                  fontSize: "2.5vw",
                  color: "#412601",
                  borderRadius: "0 0 40px 40px",
                }}
              >
                {formatValue(buyPrice, weight)}
              </Typography>
            </CardContent>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CommodityGrid;
