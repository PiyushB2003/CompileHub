import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Context } from '../context/Context';
import BackgroundLetterAvatars from './BackgroundLetterAvatars';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userName, userEmail, avatar, loggedFromEmail, GoogleLogout } = useContext(Context);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log(userName, userEmail, avatar);
        setAnchorEl(null);
    };

    const GetFirstName = () => {
        let firstname = userName?.split(" ")[0];
        return firstname;
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {
                            loggedFromEmail ? <Avatar sx={{ width: 32, height: 32 }}>
                                <BackgroundLetterAvatars username={userName} />
                            </Avatar> : <Avatar sx={{ width: 32, height: 32 }}>
                                <img src={avatar} alt="profile" />
                            </Avatar>
                        }
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    {
                        loggedFromEmail ? <div className='flex flex-col items-center'>
                            <p className='my-3'>{userEmail}</p>
                                <BackgroundLetterAvatars username={userName} />
                            <p className='text-center'>Hii, {GetFirstName()}</p>
                        </div> : <div className='flex flex-col items-center'>
                            <p className='my-3'>{userEmail}</p>
                            <img src={avatar} alt="profile" className='size-14 rounded-full' />
                            <p className='text-center'>Hii, {GetFirstName()}</p>
                        </div>
                    }

                </MenuItem>

                <MenuItem onClick={GoogleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
