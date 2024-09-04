import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Define custom styles
const MarketData = styled(Box)(({ theme }) => ({
    backgroundColor: "#412601",
    borderRadius: "8px",
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
    backgroundColor: "#00FF00",
});

const SellersBar = styled(Box)({
    height: "100%",
    backgroundColor: "#FF0000",
});

const BuyerSeller = () => {
    return (
        <MarketData
            className="bg-white p-4 rounded-lg shadow-md"
            sx={{ marginTop: "40px" }}
        >
            <MarketDataRow className="mb-2">
                <Typography variant="body2" color="#FFF">
                    BUYERS
                </Typography>
                <Typography variant="body2" style={{ color: "#00FF00" }}>
                    0.080%
                </Typography>
                <Typography variant="body2" color="#FFF">
                    SELLER
                </Typography>
            </MarketDataRow>
            <MarketDataBar className="mb-2">
                <BuyersBar style={{ width: "81%" }} />
                <SellersBar style={{ width: "19%" }} />
            </MarketDataBar>
            <MarketDataRow>
                <Typography variant="body2" color="#FFF">
                    81%
                </Typography>
                <Typography variant="body2" color="#FFF">
                    19%
                </Typography>
            </MarketDataRow>
        </MarketData>
    );
};

export default BuyerSeller;
