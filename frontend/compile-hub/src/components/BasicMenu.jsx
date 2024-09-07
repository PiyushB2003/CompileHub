import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../utils/Icons';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <span
                id="basic-button"
                className='cursor-pointer font-semibold'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <span className='text-black capitalize flex hover:text-[#00cd9d] items-center'>
                    <span>Language</span><span>
                        {
                            anchorEl ? <KeyboardArrowUpIcon className=' scale-75' /> : <KeyboardArrowDownIcon className=' scale-75' />
                        }
                    </span>
                </span>
            </span>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>C++</MenuItem>
                <MenuItem onClick={handleClose}>Java</MenuItem>
                <MenuItem onClick={handleClose}>Python</MenuItem>
                <MenuItem onClick={handleClose}>JavaScript</MenuItem>
                <MenuItem onClick={handleClose}>C</MenuItem>
            </Menu>
        </div>
    );
}
