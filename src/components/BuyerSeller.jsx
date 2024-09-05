import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Define custom styles
const MarketData = styled(Box)(({ theme }) => ({
    backgroundColor: "#D8BE70",
    borderRadius: "35px",
    padding: theme.spacing(2),
}));

const MarketDataRow = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
}));

const MarketDataBar = styled(Box)({
    display: "flex",
    height: "8px",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "8px",
});

const BuyersBar = styled(Box)({
    height: "100%",
    backgroundColor: "green",
});

const SellersBar = styled(Box)({
    height: "100%",
    backgroundColor: "red",
});

const BuyerSeller = () => {
    return (
        <MarketData
            className="p-4 rounded-lg shadow-md"
            sx={{ marginTop: "20px" }}
        >
            <MarketDataRow className="mb-2">
                <Typography variant="body2" color="#412601" fontWeight="bold">
                    BUYERS
                </Typography>
                <Typography variant="body2" style={{ color: "green", fontWeight: '600' }}>
                    0.080%
                </Typography>
                <Typography variant="body2" color="#412601" fontWeight="bold">
                    SELLER
                </Typography>
            </MarketDataRow>
            <MarketDataBar className="mb-2">
                <BuyersBar style={{ width: "81%" }} />
                <SellersBar style={{ width: "19%" }} />
            </MarketDataBar>
            <MarketDataRow>
                <Typography variant="body2" color="#412601" fontWeight="bold">
                    81%
                </Typography>
                <Typography variant="body2" color="#412601" fontWeight="bold">
                    19%
                </Typography>
            </MarketDataRow>
        </MarketData>
    );
};

export default BuyerSeller;
