import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Search,
    Message,
    Close,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';

import { setMode, setLogin, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';



const Navbar = () => {
    const [isMobileToggled, setIsMobileToggled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const state = useSelector((state) => state);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

   
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user?.firstName} ${user?.lastName}`;


    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt} >
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem,2rem,2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: "primary",
                            cursor: "pointer",
                        },
                    }}
                >
                    Socipedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder='Search...' />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* Destork Nav */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (<LightMode sx={{ fontSize: "25px", color: "dark" }} />)}
                    </IconButton>
                    <Message sx={{ fontSize: "25px", cursor: "pointer" }} onClick={() => navigate("/chat")} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant='standard' value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                padding: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>
                                    {fullName}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileToggled(!isMobileToggled)}>
                    <Menu />
                </IconButton>
            )}

            {/* Mobile Nav */}
            {!isNonMobileScreens && isMobileToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    maxWidth="500px"
                    zIndex="10"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileToggled(!isMobileToggled)}>
                            <Close />
                        </IconButton>
                    </Box>
                    {/* Menu Items */}
                    <FlexBetween gap="3rem" justifyContent="center" alignItems="center" flexDirection="column">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (<LightMode sx={{ fontSize: "25px", color: "dark" }} />)}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant='standard' value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>
                                        {fullName}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>


                </Box>
            )}

        </FlexBetween>
    )
}

export default Navbar;