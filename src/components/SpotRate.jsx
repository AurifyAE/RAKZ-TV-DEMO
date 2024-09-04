// SpotRate.jsx
import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSpotRate } from '../context/SpotRateContext';

const SpotRate = () => {
    const { goldData, silverData } = useSpotRate();

    const getBackgroundColor = (change) => {
        if (change === 'up') {
            return 'green'; // Green color for increase
        } else if (change === 'down') {
            return 'red'; // Red color for decrease
        }
        return ''; // White color for no change
    };

    const getColor = (change) => {
        if (change === 'up') {
            return 'white'; // Green color for increase
        } else if (change === 'down') {
            return 'white'; // Red color for decrease
        }
        return '#412601'; // White color for no change
    };

    const renderSpotSection = (metal, data) => (
        <Box
            sx={{
                backgroundColor: '#D8BE70',
                padding: '1.5vw',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h6" sx={{ fontSize: '2vw', fontWeight: 'bold', color: '#412601' }}>
                {metal.toUpperCase()}
            </Typography>
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '6px',
                        borderRadius: '8px',
                        fontSize: '2vw',
                        fontWeight: 'bold',
                        margin: '1vw 0',
                        color: getColor(data.bidChanged),
                        backgroundColor: getBackgroundColor(data.bidChanged),
                        border: '3px solid #412601',
                        width: '10vw'
                    }}
                >
                    {data.bid}
                </Typography>
                <Typography variant="body2"
                    sx={{ fontSize: '1.3vw', color: '#412601', fontWeight: 'bold' }}>
                    LOW {data.low}
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '6px',
                        borderRadius: '8px',
                        fontSize: '2vw',
                        fontWeight: 'bold',
                        margin: '1vw 0',
                        color: getColor(data.bidChanged),
                        backgroundColor: getBackgroundColor(data.bidChanged),
                        border: '3px solid #412601',
                        width: '10vw'
                    }}
                >
                    {data.ask}
                </Typography>
                <Typography variant="body2"
                    sx={{ fontSize: '1.3vw', color: '#412601', fontWeight: 'bold' }}
                >
                    HIGH {data.high}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box
            className="p-6 mx-auto rounded-lg text-center"
            sx={{
                maxWidth: '100%',
                backgroundColor: '#412601',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                color: 'white',
            }}
        >
            <Box className="flex items-center justify-between pl-2 pr-20">
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontSize: '2vw', fontWeight: 'bold', marginBottom: '2vw', color: '#ffffff' }}
                >
                    Spot Rate
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontSize: '2vw', fontWeight: 'bold', marginBottom: '2vw', color: '#ffffff' }}
                >
                    BID
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontSize: '2vw', fontWeight: 'bold', marginBottom: '2vw', color: '#ffffff' }}
                >
                    ASK
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2vw' }}>
                {renderSpotSection('gold', goldData)}
                {renderSpotSection('silver', silverData)}
            </Box>
        </Box>
    );
};

export default SpotRate;
