import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../utils/Icons';
import { NavLink } from 'react-router-dom';
import { Boilerplates } from '../utils/BoilerplateCode';
import { Context } from '../context/Context';


const Languages = [
    {
        language_code: "cpp",
        language_name: "C++"
    },
    {
        language_code: "java",
        language_name: "Java"
    },
    {
        language_code: "python",
        language_name: "Python"
    },
    {
        language_code: "javascript",
        language_name: "JavaScript"
    },
    {
        language_code: "c",
        language_name: "C"
    },
];
export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {setCode, setLanguage} = React.useContext(Context);
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
                <span className='text-black dark:text-white dark:hover:text-[#00cd9d] capitalize flex hover:text-[#00cd9d] items-center'>
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
                {
                    Languages.map((obj, index) => {
                        return (
                            <NavLink to="/compiler" key={index} onClick={() => {
                                setLanguage(obj.language_code)
                                setCode(Boilerplates[obj.language_code])
                            }}>
                                <MenuItem onClick={handleClose}>
                                    {obj.language_name}
                                </MenuItem>
                            </NavLink>
                        )
                    })
                }
            </Menu>
        </div>
    );
}
