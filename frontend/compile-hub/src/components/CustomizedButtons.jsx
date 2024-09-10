import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ArrowForwardRoundedIcon } from '../utils/Icons';
import { NavLink } from 'react-router-dom';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#25265E"),
    backgroundColor: "#25265E",
    '&:hover': {
        backgroundColor: "#17183b",
    },
}));

export function CustomizedButtons({ children }) {
    return (
        <Stack spacing={2} direction="row">
            <NavLink to="/compiler">
                <ColorButton variant="contained"><span className="px-5 text-lg capitalize">Start Coding <ArrowForwardRoundedIcon /></span></ColorButton>
            </NavLink>
        </Stack>
    );
}
