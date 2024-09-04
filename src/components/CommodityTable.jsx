import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityTable = ({ commodities }) => {
    const { goldData, silverData } = useSpotRate();

    // Helper function to get bid and ask values based on metal type
    const getBidAskValues = (metal) => {
        if (metal === "gold" || metal === "gold kilobar") {
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
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: "#412601", 
                color: "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "2vw",
                                textAlign: "center",
                            }}
                            colSpan={2}
                        >
                            Commodity
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "2vw",
                                textAlign: "center",
                            }}
                        >
                            Weight
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "2vw",
                                textAlign: "center",
                            }}
                        >
                            Buy
                        </TableCell>
                        <TableCell
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "2vw",
                                textAlign: "center",
                            }}
                        >
                            Sell
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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

                        // Ensure all values are numbers
                        const unitMultiplier =
                            {
                                GM: 1,
                                KG: 1000,
                                TTB: 116.64,
                                TOLA: 11.664,
                                OZ: 31.1034768,
                            }[weight] || 1;

                        const weightValue = parseFloat(weight) || 0;
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

                        // Calculation of buyPrice and sellPrice
                        const buyPrice =
                            biddingPrice * unitMultiplier * unit * purityPower +
                            buyChargeValue;
                        const sellPrice =
                            askingPrice * unitMultiplier * unit * purityPower +
                            sellChargeValue;

                        return (
                            <TableRow
                                key={index}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? "#412601" : "#412601",
                                    "&:last-child td, &:last-child th": { border: 0 },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        color: "white",
                                        borderBottom: "1px solid #ffffff",
                                        fontSize: "2vw",
                                        fontWeight: "bold",
                                        textAlign: "right",
                                    }}
                                >
                                    {commodity.metal}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "white",
                                        borderBottom: "1px solid #ffffff",
                                        fontSize: "1.3vw",
                                        textAlign: "left",
                                        paddingLeft: "0px",
                                    }}
                                >
                                    {purity}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "white",
                                        borderBottom: "1px solid #ffffff",
                                        fontSize: "2vw",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    {unit} {weight}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "white",
                                        borderBottom: "1px solid #ffffff",
                                        fontSize: "2vw",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    {formatValue(buyPrice, weight)}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: "white",
                                        borderBottom: "1px solid #ffffff",
                                        fontSize: "2vw",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    {formatValue(sellPrice, weight)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CommodityTable;
