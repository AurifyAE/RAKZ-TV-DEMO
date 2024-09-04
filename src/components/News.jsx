import React from 'react';
import { Box, Typography } from '@mui/material';

const NewsTicker = ({ newsItems}) => {
    return (
        <Box
            sx={{
                backgroundColor: '#412601',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                height: '50px',
                marginTop: '15px'
            }}
        >
            <Typography
                sx={{
                    backgroundColor: '#6F4E37',
                    color: '#FFDC7F',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1.5vw',
                    width: '250px',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                }}
            >
                RAKZ NEWS
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                }}
            >
                <Box
                    component="div"
                    sx={{
                        display: 'inline-block',
                        animation: 'scroll 40s linear infinite',
                        color: 'white',
                        fontSize: '2vw',
                        textAlign: 'center',
                    }}
                >
                    {newsItems.map((item, index) => (
                        <Typography
                            key={index}
                            component="span"
                            sx={{
                                marginRight: '4vw',
                                display: 'inline-block',
                                color: 'white',
                                fontSize: '2vw',
                            }}
                        >
                            {item.description}
                        </Typography>
                    ))}
                </Box>
                <style>
                    {`
            @keyframes scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
                </style>
            </Box>
        </Box>
    );
};

export default NewsTicker;
