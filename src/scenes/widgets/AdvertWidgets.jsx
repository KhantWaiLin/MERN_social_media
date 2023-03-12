import React from 'react';
import WidgetWrapper from '../../components/WidgetWrapper';
import { Typography, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';


const AdvertWidgets = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;


    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Created ad
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                src="http://localhost:3001/assets/info4.jpeg"
                alt='advert'
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }} />
            <FlexBetween>
                <Typography color={main} >
                    Cosmetic
                </Typography>
                <Typography color={medium}>
                    Cosmetic.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Your pathway to stunning and immaculate beauty and make sure your skin is exfoliating skin and shining like light.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidgets