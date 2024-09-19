import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ArrowForwardRoundedIcon } from '../utils/Icons';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';


export function CustomizedButtons({ children }) {
    const {isDarkMode} = React.useContext(Context);
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText( isDarkMode ? "#1a181e" : "#25265E"),
        backgroundColor: isDarkMode ?  "#1a181e" : "#25265E",
        '&:hover': {
            backgroundColor: isDarkMode ? "#242129" : "#17183b",
        },
    }));
    return (
        <Stack spacing={2} direction="row">
            <NavLink to="/compiler">
                <ColorButton variant="contained"><span className="md:px-5 px-12 text-lg capitalize">Start Coding <ArrowForwardRoundedIcon /></span></ColorButton>
            </NavLink>
        </Stack>
    );
}
